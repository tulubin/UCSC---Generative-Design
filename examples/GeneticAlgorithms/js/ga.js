class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;

        this.init();
    }

    init() {
        for (let i = 0; i < this.indSize; i++) {
            this.gens[i] = int(random(2));
        }
    }
}

class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunction) {
        this.popSize = popSize;
        this.indSize = indSize;
        this.fitFunction = fitFunction
        this.init();
    }

    init() {
        this.population = new Array(this.popSize);
        for (let i = 0; i < this.popSize; i++) {
            // initialize individual i randomly
            this.population[i] = new Individual(this.indSize);
        }
    }

    evolve(n) {
        // for (let i = 0; i < n; i++) {
        //     this.evaluate();
        //     this.select();
        // }
        this.evaluate();

        let matingPool = this.select();
        let newPopulation = this.reproduce(matingPool);
        this.mutate(newPopulation);

        this.population = newPopulation;

        this.evaluate();
        return this.best();
    }

    evaluate() {
        for (let i = 0; i < this.popSize; i++) {
            let individual = this.population[i];
            individual.fitness = this.fitFunction(individual.gens);
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize individual to be the parents
        for (let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }
        return matingPool;
    }

    rouletteWheel() {
        let totalFitness = 0;
        for (let i = 0; i < this.popSize; i++) {
            totalFitness += this.population[i].fitness;
        }
        for (let i = 0; i < this.popSize; i++) {
            // let result = map(this.population[i].fitness, 0, totalFitnes, 0, 1);
            this.population[i].fitness /= totalFitness;
        }

        // sum up all fitnesses to 1
        let r = random();
        let fitnessSoFar = 0;
        for (let i = 0; i < this.popSize; i++) {
            fitnessSoFar += this.population[i].fitness;
            if (r < fitnessSoFar) {
                return this.population[i];
            }

        }
        return this.population[this.population.length - 1];
    }

    reproduce(matingPool) {
        let newPopulation = new Array(this.popSize);

        for (let i = 0; i < this.popSize; i++) {
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));

            newPopulation[i] = this.crossover(matingPool[a], matingPool[b]);
        }

        return newPopulation;
    }

    crossover(parentA, parentB) {
        let child = new Individual(this.indSize);

        let midPoint = int(random(this.indSize));
        for (let i = 0; i < this.indSize; i++) {
            if (i < midPoint) {
                child.gens[i] = parentA.gens[i];
            }
            else {
                child.gens[i] = parentB.gens[i];
            }
        }

        return child;
    }

    mutate(newPopulation) {
        for (let i = 0; i < this.popSize; i++) {
            for (let j = 0; j < this.indSize; j++) {
                if (random() < this.mutationRate) {
                    newPopulation[i].gens[j] = int(random(2));
                }
            }
        }
    }

    best() {
        let max = -1;
        let bix = 0;

        for (let i = 0; i < this.popSize; i++) {
            if (this.population[i].fitness > max) {
                max = this.population[i].fitness;
                bix = i;
            }
        }

        return this.population[bix];
    }
}

// function symFunction(individual) {
//     let level = genToPhen(individual, levelW, levelH);

//     let w = levelW;
//     let h = levelH;

//     let simmtry = 0;
//     for (let i = 0; i < ceil(w / 2); i++) {
//         for (let j = 0; j < ceil(h / 2); j++) {
//             simmetry += abs(level[i][j] - level[w - i - 1][j]);
//             simmetry += abs(level[i][j] - level[i][h - j - 1]);
//             simmetry += abs(level[i][j] - level[w - i - 1][h - j - 1]);
//         }
//     }

//     return ((w * h) - simmetry);
// }