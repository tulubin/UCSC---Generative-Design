class GeneticAlgorithm {
    constructor(popSize, mutationRate) {
        this.popSize = popSize;
        this.mutationRate = mutationRate;
        this.init();
        this.bestCarSoFar = null;
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

    evolve(leaderboard) {
        let bc = leaderboard[0];
        console.log(bc);
        // console.log(bc.name);
        // console.log(bc.progress);
        // console.log("!" + bc.progress.toFixed(3));
        this.best(bc.feats, bc.name, bc.progress);
        let matingPool = this.select(leaderboard);
        let newCars = this.reproduce(matingPool);

        this.mutate(newCars);

        this.cars = newCars;

        console.log("!!");
        console.log(this.bestCarSoFar);
        return this.bestCarSoFar;
    }

    select(leaderboard) {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for (let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel(leaderboard);
            matingPool.push(survivor);
        }
        return matingPool;
    }

    rouletteWheel(leaderboard) {
        let totalProgress = 0;
        for (let i = 0; i < this.popSize; i++) {
            totalProgress += leaderboard[i].progress;
        }
        for (let i = 0; i < this.popSize; i++) {
            leaderboard[i].progress /= totalProgress;
        }

        // sum up all fitnesses to 1
        let r = random();
        let progressSoFar = 0;
        for (let i = 0; i < this.popSize; i++) {
            progressSoFar += leaderboard[i].progress;
            if (r < progressSoFar) {
                return leaderboard[i];
            }

        }
        return leaderboard[leaderboard.length - 1];
    }

    reproduce(matingPool) {
        let newCars = new Array(this.popSize);

        for (let i = 0; i < this.popSize; i++) {
            let Superior = this.rouletteWheel(matingPool);
            let randomOne = int(random(this.popSize));
            // let SuperiorB = this.rouletteWheel(matingPool);
            newCars[i] = this.crossover(Superior, matingPool[randomOne], i);
        }
        // for (let i = 0; i < this.popSize; i++) {
        //     let a = int(random(this.popSize));
        //     let b = int(random(this.popSize));

        //     newCars[i] = this.crossover(matingPool[a], matingPool[b], i);
        // }

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

    best(feats, name, progress) {
        if (this.bestCarSoFar != null) {
            if (this.bestCarSoFar.progress < bc.progress) {
                // console.log("1");
                // console.log(this.bestCarSoFar.progress);
                // console.log(bc.progress);
                this.feats = feats;
                this.name = name;
                this.progress = progress;
                // this.bestCarSoFar.fitness = bc.fitness;
                // return bc.car;
                bestGeneration = generation;
            }
            // return this.bestCarSoFar;
        } else {
            // console.log("2");
            // console.log(this.bestCarSoFar.progress);
            // console.log(bc);
            // console.log(bc.progress.toFixed(3));
            // let c = bc.car;
            this.feats = feats;
            this.name = name;
            this.progress = progress;
            // this.bestCarSoFar.fitness = bc.fitness;
            // return bc.car;
            bestGeneration = generation;
            // console.log(this.bestCarSoFar);
            // console.log(this.bestCarSoFar.progress.toFixed(3));
        }
    }
}
