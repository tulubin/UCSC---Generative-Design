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

    evolve(leaderboard) {
        let matingPool = this.select(leaderboard);
        let newCars = this.reproduce(matingPool);

        this.mutate(newCars);

        this.cars = newCars;

        return this.best(leaderboard[0]);
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

    // redesign !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

    best(bestCar) {
        return bestCar;
    }

}
