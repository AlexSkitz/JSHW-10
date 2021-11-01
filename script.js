
document.addEventListener("DOMContentLoaded", async () => {
    const isActiveTrafficLight = true;

    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));

    const redLight = document.getElementById('red');
    const yellowLight = document.getElementById('yellow');
    const greenLight = document.getElementById('green');

    const pedestrianRedLight = document.getElementById('pedestrian-red');
    const pedestrianGreenLight = document.getElementById('pedestrian-green');

    const lightsObj = {
        activeTime: 0,
        element: null
    };
    const lightObjects = {
        red: {
            activeTime: 5000,
            element: greenLight
        },
        yellow: {
            activeTime: 3000,
            element: yellowLight
        },
        green: {
            activeTime: 10000,
            element: redLight
        },
    };
    const pedestrianObjects = {
        red: {
            activeTime: 10000,
            element: pedestrianRedLight
        },
        green: {
            activeTime: 3000,
            element: pedestrianGreenLight
        },
    };
    async function activateTrafficLight(lightObjects, lightColor) {
        const light = lightObjects[lightColor];

        showLight(light);

    }
    async function trafficLight(lightObjects) {
        turnOffLight(lightObjects['green']);
        activateTrafficLight(lightObjects, 'yellow');
        await delay(lightObjects['yellow'].activeTime);
        turnOffLight(lightObjects['yellow']);
        activateTrafficLight(lightObjects, 'red');
        await delay(lightObjects['red'].activeTime);
        turnOffLight(lightObjects['red']);

    }
    async function pedestrianTrafficLight() {
        const greenLight = pedestrianObjects['green'];
        const redLight = pedestrianObjects['red'];

        turnOffLight(redLight);
        showLight(greenLight);
        await delay(greenLight.activeTime);
        turnOffLight(greenLight);

    }
    function showLight(lightObject) {
        const light = lightObject.element;
        light.classList.add('active');
    }
    function turnOffLight(lightObject) {
        const light = lightObject.element;
        light.classList.remove('active');
    }
    function initialState() {
        showLight(lightObjects['green']);
        showLight(pedestrianObjects['red']);
    }
    async function controlLight() {
        initialState();
        await domEventPromise(pedestrianButton, 'click');
        trafficLight(lightObjects);
        await pedestrianTrafficLight();
    }
    async function domEventPromise(element, eventName) {
        const resolver = (resolve, event) => {
            resolve(event);
        };
        const event = await new Promise((resolve) => {
            element.addEventListener(eventName, (event) => resolver(resolve, event));
        });
        element.removeEventListener(eventName, resolver);
        return event;
    }
    const pedestrianButton = document.getElementById('pedestrian-button');
    async function startTrafficLight() {
        while (true) {
            await controlLight();

        }
    }
    startTrafficLight();
});

//
//

async function speedTest(getPromise, count, parallel = 1) {
    console.log(getPromise().then((res) => console.log(res)));
    console.log(parallel);

    const promiseArr = [];
    const startTime = performance.now();

    for (let i = 0; i < count; i++) {
        for (let k = 0; k < parallel; k++) {
            promiseArr.push(getPromise());
        }
    }
    const countTime = performance.now();
    const final = Promise.all(promiseArr);
    await final;

    let promiseTime = performance.now();

    return {
        duration: (countTime - startTime),
        querySpeed: 1000 / (countTime - startTime) / (count * parallel),
        queryDuration: 1000 / (countTime - startTime) / (count * parallel),
        parallelSpeed: 1000 / (promiseTime - startTime) / (count * parallel),
        parallelDuration: (promiseTime - startTime) / (count * parallel),
    }
}

 
speedTest(() => delay(1000), 10, 10).then(result => console.log(result));
speedTest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(res => console.log(res));