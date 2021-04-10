import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monkey-problem',
  templateUrl: './monkey-problem.component.html',
  styleUrls: ['./monkey-problem.component.css'],
})
export class MonkeyProblemComponent implements OnInit {
  phrase = 'To be or not to be that is the question!';
  populationCount = 15000;
  mutationRate = 0.01;
  opFoundFlag = false;
  similarPhrases: Array<string> = [];
  timeTaken = 0;
  gc = 0;
  constructor() {}

  ngOnInit(): void {}
  argMax(array: Array<number>) {
    return array
      .map((x, i) => [x, i])
      .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  initPopulation(
    nPopulation: number,
    phraseLen: number,
    randomPool: Array<number>
  ) {
    let population = [];
    for (let i = 0; i < nPopulation; i++) {
      let randomString = '';
      for (let j = 0; j < phraseLen; j++) {
        let randomAscii: number =
          randomPool[Math.floor(Math.random() * randomPool.length)];

        randomString += String.fromCharCode(randomAscii);
      }
      population.push(randomString);
    }
    return population;
  }
  computeFitnessScore(population: Array<string>, target: string) {
    const fitnesScores: Array<number> = [];
    for (let i = 0; i < population.length; i++) {
      const phrase: string = population[i];
      let score = 0;
      for (let j = 0; j < phrase.length; j++) {
        if (phrase[j] == target[j]) {
          score += 1;
        }
      }
      score /= target.length;
      fitnesScores.push(score);
    }
    return fitnesScores;
  }
  crossover(father: string, mother: string) {
    const midPoint = this.getRandomInt(0, father.length);
    let child = father.substring(0, midPoint) + mother.substring(midPoint);
    return child;
  }
  mutate(child: string, mutationRate: number, randomPool: Array<number>) {
    for (let i = 0; i < child.length; i++) {
      const randomNumber = Math.random();
      if (randomNumber < mutationRate) {
        const randomAscii =
          randomPool[Math.floor(Math.random() * randomPool.length)];
        child =
          child.substring(0, i) +
          String.fromCharCode(randomAscii) +
          child.substring(i + 1, child.length);
      }
    }
    return child;
  }
  evaluate(population: Array<string>, target: string) {
    target = target.toLowerCase();
    for (let i = 0; i < population.length; i++) {
      let phrase = population[i].toLowerCase();
      if (phrase == target) {
        return true;
      }
    }
    return false;
  }
  onGo() {
    const start = new Date().getTime();
    this.similarPhrases = [];
    let _phrase = this.phrase.toLowerCase();
    let random_pool = [];
    for (let i = 32; i < 127; i++) {
      random_pool.push(i);
    }
    let generationCount = 0;
    let population: Array<string> = [];
    while (true) {
      if (generationCount == 0) {
        population = this.initPopulation(
          this.populationCount,
          this.phrase.length,
          random_pool
        );
      }
      let fitnesScores = this.computeFitnessScore(population, this.phrase);
      const mattingPool = [];
      for (let i = 0; i < fitnesScores.length; i++) {
        const fs: number = fitnesScores[i];
        const nRepeats: number = Math.trunc(fs * 100);
        for (let j = 0; j < nRepeats; j++) {
          mattingPool.push(population[i]);
        }
      }
      // Now choose father and mother for reproduction
      for (let idx = 0; idx < this.populationCount; idx++) {
        const father =
          mattingPool[Math.floor(Math.random() * mattingPool.length)];
        const mother =
          mattingPool[Math.floor(Math.random() * mattingPool.length)];
        let child = this.crossover(father, mother);
        child = this.mutate(child, this.mutationRate, random_pool);
        population[idx] = child;
      }
      let breakFlag = this.evaluate(population, this.phrase);
      if (breakFlag) {
        console.log('Found');
        for (const item of population) {
          if (item.toLowerCase() == this.phrase.toLowerCase()) {
            console.log(item.toLowerCase());
            this.opFoundFlag = true;
            this.similarPhrases.push(item.toLowerCase());
            this.gc = this.similarPhrases.length;
            break;
          }
        }
        break;
      }

      this.similarPhrases.push(population[this.argMax(fitnesScores)]);
      generationCount++;
    }
    this.timeTaken = new Date().getTime() - start;
  }
}
