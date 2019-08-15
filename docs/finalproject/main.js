const FIGHTER_SPEED = 150;
const MAX_FIGHTER_DIS = 600;
const INIT_SPAWN_CD = 3000;

/*let scrollx = 0;
let scrolly = 0;*/
let t_GlobalTimeSpeed = 1;
let width = 0;
let height = 0;
let currentBayUID = 0;
let spawnCD = INIT_SPAWN_CD;
let timeX = 2;
let timeY = 3;
let timeZ = 5;
let meteoriteTargetX = 4;
let meteoriteTargetY = 5;
let meteoriteSend = 0;
let currentName = 0;
let currentFeats = [];
let currentMeteoriteMass = 0;
let currentMeteorite = 0;
let globalPopSize = 30;
let maxIndex = 2;
let meteoriteStart = false;

let ga;
let round;

runOnStartup(async runtime => {
	runtime.objects.Fighter.setInstanceClass(fighterInstance);
	runtime.objects.FighterBay.setInstanceClass(fighterBayInstance);
	runtime.objects.Meteorite.setInstanceClass(MeteoriteInstInstance);
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

function OnBeforeProjectStart(runtime) {
	runtime.layout.addEventListener("beforelayoutstart", () => OnBeforeLayoutStart(runtime));
	runtime.layout.addEventListener("afterlayoutstart", () => OnAfterlayoutstart(runtime));
	runtime.addEventListener("tick", () => Tick(runtime));
	runtime.addEventListener("keydown", e => OnKeyDown(e, runtime));
}

function OnBeforeLayoutStart(runtime) {
	width = runtime.layout.width;
	height = runtime.layout.height;
}
function OnAfterlayoutstart(runtime) {
	globalThis.setTimeout(() => spawnMeteorite(runtime), spawnCD);
	/*globalThis.setTimeout(() => spawnMeteorite(runtime), spawnCD);*/
}

function spawnMeteorite(runtime) {
	ga = new GeneticAlgorithm(globalPopSize, 0.4, runtime);
	
	/*MeteoriteInstInstance.Create(runtime);
	globalThis.setTimeout(() => spawnMeteorite(runtime), spawnCD / runtime.globalVars.GlobalTimeSpeed);*/
}

function Tick(runtime) {
	const dt = runtime.dt;
	/*controls(runtime);*/
	if (runtime.globalVars.GlobalTimeSpeed !== 0) {
		if (currentMeteorite === globalPopSize) {
			currentMeteorite = 0;
			ga.setPop(runtime);
			round = new Round(ga.meteorites, roundOverCallback, runtime);
		}
		/*globalThis.setTimeout(() => MeteoriteInstInstance.Create(runtime), spawnCD);*/
		for (const fighterInstance of runtime.objects.Fighter.instances()) {
			fighterInstance.Move(runtime, dt);
		}
		for (const fighterBayInstance of runtime.objects.FighterBay.instances()) {
			/*if (fighterBayInstance.ammo > 0) {
				globalThis.setInterval(() => fighterBayInstance.Launch(runtime), 3000);
			}*/
			fighterBayInstance.Launch(runtime);
		}
		for (const MeteoriteInstInstance of runtime.objects.Meteorite.instances()) {
			if (MeteoriteInstInstance.instVars.HP <= 0 || isMeteoriteOutsideLayout(MeteoriteInstInstance)) {
				MeteoriteInstInstance.destroyMeteorite();
			}
			MeteoriteInstInstance.move(runtime, dt);
		}
		if (meteoriteStart) {
			if (round.running) {
				round.update(runtime.objects.Meteorite.getAllInstances(), runtime);
			}
		}
	}
}

class MeteoriteInstInstance extends ISpriteInstance {
	constructor() {
		super();
		this.initX = this.x;
		this.initY = this.y;
		this.name = currentName;
		this.feats = currentFeats;
		this.meteoriteMass = currentMeteoriteMass;
		this.speed = 1 / this.meteoriteMass * 20;
		this.instVars.HP = Math.pow(this.meteoriteMass, 2) * (1000 + meteoriteSend);
		this.instVars.Size = this.meteoriteMass * 5;
		this.angle = angleTo(this.x, this.y, 200, 200);
		currentMeteorite++;
		/*this.init();*/
	}

	static Create(runtime, name, feats) {
		if (runtime.globalVars.GlobalTimeSpeed !== 0) {
			currentName = name;
			currentFeats = feats;
			currentMeteoriteMass = feats[1];
			runtime.objects.Meteorite.createInstance("Game", feats[0].x, feats[0].y);
			meteoriteSend++;
			/*
			timeX += 0.1;
			timeY += 0.1;
			let x = noise(timeX) * width;
			let y = noise(timeY) * height;
			runtime.objects.Meteorite.createInstance("Game", x, height);
			runtime.objects.Meteorite.createInstance("Game", width, y);
			meteoriteSend += 2;
			spawnCD = Math.max(1000 / (1000 + meteoriteSend) * INIT_SPAWN_CD, 500);*/
		}
	}

	static randomFeatures() {
		let features = new Array(maxIndex);

		/*let meteoriteMass = Math.min(noise(meteoriteTargetX * 10, meteoriteTargetY * 10) * 70, FIGHTER_SPEED);*/
		let r = Math.random();
		let spawnX = 0;
		let spawnY = 0;
		if (r > 0.5) {
			spawnX = Math.random() * width;
			spawnY = height;
		} else {
			spawnX = width;
			spawnY = Math.random() * height;
		}
		features[0] = { "x": spawnX, "y": spawnY };

		let meteoriteMass = Math.max(Math.random(), 0.1);
		features[1] = meteoriteMass;

		return features;
	}

	move(runtime, dt) {
		/*this.angle = angleRotate(this.angle, this.angleToStation, toRadians(1));*/
		this.x += Math.cos(this.angle) * this.speed * dt;
		this.y += Math.sin(this.angle) * this.speed * dt;
	}

	destroyMeteorite() {
		this.destroy();
	}
}

class Round {
	constructor(meteorites, roundOver, runtime) {
		this.meteorites = meteorites;
		this.roundOver = roundOver;
		this.running = false;
		meteoriteStart = true;
		this.runtime = runtime;
		this.start();
	}

	start() {
		this.leaderboards = {};

		for (let i = 0; i < this.meteorites.length; i++) {
			let name = this.meteorites[i].name;
			/*let feats = this.meteorites[i].feats.slice(0);*/
			this.leaderboards[name] = { "meteorite": this.meteorites[i], "progress": 0 };
		}

		this.running = true;
		/*globalThis.setTimeout(() => spawnMeteorite(this.runtime), spawnCD);*/
	}

	stop() {
		this.running = false;
	}

	getLeaderboards() {
		let leaderboards = [];

		for (let meteoriteName in this.leaderboards) {
			let meteorite = this.leaderboards[meteoriteName].meteorite;
			/*let feats = this.leaderboards[meteoriteName].feats;*/
			let progress = this.leaderboards[meteoriteName].progress;

			leaderboards.push({ "meteorite": meteorite, "progress": progress });
		}

		leaderboards.sort((a, b) => (a.progress < b.progress) ? 1 : -1);
		return leaderboards;
	}

	getProgress(meteorite) {
		return distanceTo(meteorite.initX, meteorite.initY, meteorite.x, meteorite.y);
	}

	updateLeaderboards(instances) {
		for (let i = 0; i < instances.length; i++) {
			if (instances[i]) {
				let name = instances[i].name;
				this.leaderboards[name].progress = this.getProgress(instances[i]);
			}
		}
	}

	update(instances, runtime) {
		if (instances.length == 0) {
			if (this.roundOver) {
				let finalLeaderboards = this.getLeaderboards();
				this.roundOver(finalLeaderboards, runtime);
			}
			this.running = false;
		} else {
			this.updateLeaderboards(instances);
			this.running = true;
		}
	}
}

class GeneticAlgorithm {
	constructor(popSize, mutationRange, runtime) {
		this.popSize = popSize;
		this.mutationRange = mutationRange;
		this.init(runtime);
	}

	init(runtime) {
		this.meteorites = [];
		for (let i = 0; i < this.popSize; i++) {
			let feats = MeteoriteInstInstance.randomFeatures();
			MeteoriteInstInstance.Create(runtime, "Meteorite" + i, feats);
			/*let meteorite = new MeteoriteInstInstance("Meteorite" + i, feats);
			this.meteorites.push(meteorite);*/
		}
	}

	setPop(runtime) {
		this.meteorites = runtime.objects.Meteorite.getAllInstances();
	}

	evolve(leaderboards, runtime) {
		/*let bc = leaderboards[0];
		this.best(bc);*/
		let matingPool = this.select(leaderboards);
		let newMeteorites = this.reproduce(matingPool);
		let finalMeteorites = this.mutate(newMeteorites);
		this.nextGen(finalMeteorites, runtime);
	}

	select(leaderboards) {
		let matingPool = new Array();
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

		let r = Math.random();
		let progressSoFar = 0;
		for (let i = 0; i < this.popSize; i++) {
			progressSoFar += roulettePool[i];
			if (r < progressSoFar) {
				return leaderboards[i].meteorite;
			}

		}
		return leaderboards[this.popSize - 1].meteorite;
	}

	reproduce(matingPool) {
		let newFeats = new Array(this.popSize);

		for (let i = 0; i < this.popSize; i++) {
			let a = parseInt(Math.random() * this.popSize, 10);
			let b = parseInt(Math.random() * this.popSize, 10);
			newFeats[i] = this.crossover(matingPool[a], matingPool[b], i);
		}

		return newFeats;
	}

	crossover(parentA, parentB) {
		let feats = new Array(maxIndex);
		let randomCross = Math.random();

		for (let i = 0; i < maxIndex; i++) {
			if (randomCross < 0.5) {
				feats[i] = parentA.feats[i];
			} else {
				feats[i] = parentB.feats[i];
			}
		}
		return feats;
	}

	mutate(newMeteorites) {
		let finalMeteorites = [];
		for (let i = 0; i < this.popSize; i++) {
			let newFeats = new Array(maxIndex);
			let spawnX = 0;
			let spawnY = 0;
			if (newMeteorites[i][0].y - height < 1 && newMeteorites[i][0].y - height > -1) {
				spawnX = (Math.random() * this.mutationRange - this.mutationRange / 2) * width + newMeteorites[i][0].x;
				spawnY = height;
			} else {
				spawnX = width;
				spawnY = (Math.random() * this.mutationRange - this.mutationRange / 2) * height + newMeteorites[i][0].y;
			}
			newFeats[0] = { "x": spawnX, "y": spawnY };

			let meteoriteMass = Math.min(Math.max((Math.random() * this.mutationRange - this.mutationRange / 2) + newMeteorites[i][1], 0.1), 1);
			newFeats[1] = meteoriteMass;
			finalMeteorites.push(newFeats);
		}
		return finalMeteorites;
	}

	nextGen(finalMeteorites, runtime) {
		for (let i = 0; i < this.popSize; i++) {
			let feats = finalMeteorites[i];
			MeteoriteInstInstance.Create(runtime, "Meteorite" + i, feats);
			/*let meteorite = new MeteoriteInstInstance("Meteorite" + i, feats);
			this.meteorites.push(meteorite);*/
		}
	}
}

function roundOverCallback(finalLeaderboards, runtime) {
	ga.evolve(finalLeaderboards, runtime);
}

class fighterBayInstance extends ISpriteInstance {
	constructor() {
		super();
	}

	Launch(runtime) {
		if (this.instVars.Ammo > 0) {
			currentBayUID = this.uid;
			fighterInstance.Create(runtime, this.x, this.y);
			this.instVars.Ammo--;
		}
	}
}

class fighterInstance extends ISpriteInstance {
	constructor() {
		super();
		this.timeX = Math.random();
		this.timeY = Math.random();
		this.initX = this.x;
		this.initY = this.y;
		this.instVars.BayUID = currentBayUID;
	}

	static Create(runtime, x, y) {
		runtime.objects.Fighter.createInstance("Game", x, y);
	}

	Move(runtime, dt) {
		this.timeX += 0.1;
		this.timeY += 0.1;
		this.x += Math.cos(this.angle) * FIGHTER_SPEED * dt;
		this.y += Math.sin(this.angle) * FIGHTER_SPEED * dt;
		if (distanceTo(this.x, this.y, this.initX, this.initY) < 30 && this.instVars.Ammo <= 0) {
			this.instVars.Ammo = 10;
		}
		if (isOutsideLayout(this) || this.instVars.Ammo <= 0 || distanceTo(this.x, this.y, this.initX, this.initY) > MAX_FIGHTER_DIS) {
			this.instVars.Firing = false;
			let angleToBay = angleTo(this.x, this.y, this.initX, this.initY);
			this.angle = angleRotate(this.angle, angleToBay, toRadians(1));
			/*this.angle = angleTo(this.x, this.y, this.initX, this.initY);*/
		} else if (!this.instVars.Firing && this.instVars.Ammo > 0) {
			let angleToPatrol = angleTo(this.x, this.y, noise(this.timeX) * MAX_FIGHTER_DIS + (this.initX - MAX_FIGHTER_DIS / 2), noise(this.timeY) * MAX_FIGHTER_DIS + (this.initY - MAX_FIGHTER_DIS / 2));
			this.angle = angleRotate(this.angle, angleToPatrol, toRadians(1));
		}
	}
}

function controls(runtime) {
	const keyboard = runtime.keyboard;
	let scale = runtime.globalVars.GlobalLayoutScale;
	runtime.layout.scrollTo(scrollx, scrolly);
	if ((keyboard.isKeyDown("ArrowLeft") || keyboard.isKeyDown("a")) && scrollx > 300) {
		scrollx -= 10;
	} else if ((keyboard.isKeyDown("ArrowRight") || keyboard.isKeyDown("d")) && scrollx < width - 300) {
		scrollx += 10;
	}
	if ((keyboard.isKeyDown("ArrowUp") || keyboard.isKeyDown("w")) && scrolly > 300) {
		scrolly -= 10;
	} else if ((keyboard.isKeyDown("ArrowDown") || keyboard.isKeyDown("s")) && scrolly < height - 300) {
		scrolly += 10;
	}
}
function OnKeyDown(e, runtime) {
	if (e.key === " ") {
		runtime.globalVars.Pause += 1;
		if (runtime.globalVars.Pause === 1) {
			t_GlobalTimeSpeed = runtime.globalVars.GlobalTimeSpeed;
			runtime.globalVars.GlobalTimeSpeed = 0;
		} else if (runtime.globalVars.Pause === 2) {
			runtime.globalVars.GlobalTimeSpeed = t_GlobalTimeSpeed;
			runtime.globalVars.Pause = 0;
		}
	}
	if (e.key === "=" && runtime.globalVars.GlobalTimeSpeed < 10 && runtime.globalVars.Pause === 0) {
		runtime.globalVars.GlobalTimeSpeed++;
	}
	if (e.key === "-" && runtime.globalVars.GlobalTimeSpeed > 0 && runtime.globalVars.Pause === 0) {
		runtime.globalVars.GlobalTimeSpeed--;
	}
}
function angleTo(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}
function distanceTo(x1, y1, x2, y2) {
	return Math.hypot(x2 - x1, y2 - y1);
}
function isOutsideLayout(inst) {
	const layout = inst.layout;
	return inst.x < 0 || inst.y < 0 ||
		inst.x > layout.width || inst.y > layout.height;
}
function isMeteoriteOutsideLayout(inst) {
	return inst.x < 0 || inst.y < 0;
}
function toRadians(x) {
	return x * (Math.PI / 180);
}
function angleRotate(start, end, step) {
	const ss = Math.sin(start);
	const cs = Math.cos(start);
	const se = Math.sin(end);
	const ce = Math.cos(end);

	if (Math.acos(ss * se + cs * ce) > step) {
		if (cs * se - ss * ce > 0)
			return start + step;
		else
			return start - step;
	}
	else {
		return end;
	}
}

/* noise() code from p5.js */ var PERLIN_YWRAPB = 4; var PERLIN_YWRAP = 1 << PERLIN_YWRAPB; var PERLIN_ZWRAPB = 8; var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB; var PERLIN_SIZE = 4095; var perlin_octaves = 4; var perlin_amp_falloff = 0.5; var scaled_cosine = function (i) { return 0.5 * (1.0 - Math.cos(i * Math.PI)); }; var perlin; function noise(x, y, z) { y = y || 0; z = z || 0; if (perlin == null) { perlin = new Array(PERLIN_SIZE + 1); for (var i = 0; i < PERLIN_SIZE + 1; i++) { perlin[i] = Math.random(); } } if (x < 0) { x = -x; } if (y < 0) { y = -y; } if (z < 0) { z = -z; } var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z); var xf = x - xi; var yf = y - yi; var zf = z - zi; var rxf, ryf; var r = 0; var ampl = 0.5; var n1, n2, n3; for (var o = 0; o < perlin_octaves; o++) { var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB); rxf = scaled_cosine(xf); ryf = scaled_cosine(yf); n1 = perlin[of & PERLIN_SIZE]; n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1); n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]; n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2); n1 += ryf * (n2 - n1); of += PERLIN_ZWRAP; n2 = perlin[of & PERLIN_SIZE]; n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2); n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]; n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3); n2 += ryf * (n3 - n2); n1 += scaled_cosine(zf) * (n2 - n1); r += n1 * ampl; ampl *= perlin_amp_falloff; xi <<= 1; xf *= 2; yi <<= 1; yf *= 2; zi <<= 1; zf *= 2; if (xf >= 1.0) { xi++; xf--; } if (yf >= 1.0) { yi++; yf--; } if (zf >= 1.0) { zi++; zf--; } } return r; };