class GeneticAlgorithm {
    constructor(popSize, mutationRate) {
        this.popSize = popSize;
        this.mutationRate = mutationRate;
        this.init();

    }

    init() {
        this.cars = [];
        for (let i = 0; i < this.popSize; i++) {
            let feats = Car.randomFeatures();
            let pos = createVector(0, -100);
            let car = new Car(pos.x, pos.y, "car" + i, feats);
            this.cars.push(car);
        }
    }

    evolve(leaderboards) {
        let bc = leaderboards[0];
        this.best(bc);
        let matingPool = this.select(leaderboards);
        let newCars = this.reproduce(matingPool);
        this.mutate(newCars);
        this.cars = newCars;
    }

    select(leaderboards) {
        let matingPool = new Array();
        // Select this.popSize Individual to be the parents
        for (let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel(leaderboards);
            matingPool.push(survivor);
        }
        return matingPool;
    }

    rouletteWheel(leaderboards) {
        let totalProgress = 0;
        let roulettePool = new Array();
        for (let i = 0; i < this.popSize; i++) {
            totalProgress += leaderboards[i].progress;
            roulettePool[i] = leaderboards[i].progress;
        }
        for (let i = 0; i < this.popSize; i++) {
            roulettePool[i] /= totalProgress;
        }

        // sum up all fitnesses to 1
        let r = random();
        let progressSoFar = 0;
        for (let i = 0; i < this.popSize; i++) {
            progressSoFar += roulettePool[i];
            if (r < progressSoFar) {
                return leaderboards[i].car;
            }

        }
        return leaderboards[this.popSize - 1].car;
    }

    reproduce(matingPool) {
        let newCars = new Array(this.popSize);

        for (let i = 0; i < this.popSize; i++) {
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));

            newCars[i] = this.crossover(matingPool[a], matingPool[b], i);
        }

        return newCars;
    }

    crossover(parentA, parentB, index) {
        let feats = new Array(maxIndex);
        let midPoint = int(random(maxIndex));
        for (let i = 0; i < maxIndex; i++) {
            if (i < midPoint) {
                feats[i] = parentA.feats[i];
            } else {
                feats[i] = parentB.feats[i];
            }
        }
        let randomCrossA = random();
        let randomCrossB = random();

        for (let i = 0; i < Car.angAmount * 2; i += 2) {
            if (randomCrossA < 0.5) {
                if (randomCrossB < 0.5) {
                    feats[i] = parentA.feats[i];
                    feats[i + 1] = parentB.feats[i + 1];
                } else {
                    feats[i] = parentA.feats[i];
                    feats[i + 1] = parentA.feats[i + 1];
                }
            } else {
                if (randomCrossB < 0.5) {
                    feats[i] = parentB.feats[i];
                    feats[i + 1] = parentB.feats[i + 1];
                } else {
                    feats[i] = parentB.feats[i];
                    feats[i + 1] = parentA.feats[i + 1];
                }
            }
        }

        randomCrossA = random();
        randomCrossB = random();

        for (let i = Car.angAmount * 2; i < Car.angAmount * 2 + Car.wheAmount * 2; i += 2) {
            if (randomCrossA < 0.5) {
                if (randomCrossB < 0.5) {
                    feats[i] = parentA.feats[i];
                    feats[i + 1] = parentB.feats[i + 1];
                } else {
                    feats[i] = parentA.feats[i];
                    feats[i + 1] = parentA.feats[i + 1];
                }
            } else {
                if (randomCrossB < 0.5) {
                    feats[i] = parentB.feats[i];
                    feats[i + 1] = parentB.feats[i + 1];
                } else {
                    feats[i] = parentB.feats[i];
                    feats[i + 1] = parentA.feats[i + 1];
                }
            }
        }

        let pos = createVector(0, -100);
        let child = new Car(pos.x, pos.y, "car" + index, feats);

        return child;
    }

    mutate(newCars) {
        for (let i = 0; i < this.popSize; i++) {
            for (let j = 0; j < Car.angAmount * 2; j += 2) {
                if (random() < this.mutationRate) {
                    newCars[i].feats[j] = Car.randomAngle();
                    newCars[i].feats[j + 1] = Car.randomMagnitude();
                }
            }

            for (let j = Car.angAmount * 2; j < maxIndex; j += 2) {
                if (random() < this.mutationRate) {
                    newCars[i].feats[j] = Car.randomVertex();
                    newCars[i].feats[j + 1] = Car.randomRadius();
                }
            }
        }
    }

    best(bc) {
        if (bestCarSoFar != null) {
            if (bestCarSoFar.progress < bc.progress) {
                bestCarSoFar = bc;
                bestGeneration = generation;
            }
        } else {
            bestCarSoFar = bc;
            bestGeneration = generation;
        }
    }
}
