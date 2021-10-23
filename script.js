
document.onload = () => {
    const isActiveTrafficLight
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

    const redLight = document.getElementById('red');
    const yellowLight = document.getElementById('yellow');
    const greenLight = document.getElementById('green');

    const redLight = document.getElementById('pedestrian-red');
    const greenLight = document.getElementById('pedestrian-green');
//correct
    const lightsObj = {
        activeTime: 0,
        element: null
    }
//correct

    const lightObjects = {
        red: {
            activeTime: 15000,
            element: greenLight
        },
        yellow: {
            activeTime: 3000,
            element: yellowLight
        },
        green: {
            activeTime: 30000,
            element: redLight
        },
    }
//correct

    const pedestrianObjects = {
        red: {
            activeTime: 10000,
            element: pedestrianGreenLight
        },
        green: {
            activeTime: 5000,
            element: pedestrianRedLight
        },
    }
//
    async function activateTrafficLight(lightObjects, lightColor) {
        const light = lightObjects[lightColor]
        showLight(light);
        await delay(light.activeTime);
        turnOffLight(light);
    }
//corect++
    async function trafficLight(lightObjects) {
        turnOffLight(lightObject['green']);
        activateTrafficLight(lightObjects, 'yellow');
        await delay(lightObjects['yellow'].activeTime);
        turnOffLight(lightObjects, 'red');
        activateTrafficLight(lightObjects, 'red');
        await delay(lightObjects['red'].activeTime);
        turnOffLight(lightObjects['red']);
    }
//corect++
    async function pedestrianTrafficLight() {
        const greenLight = pedestrianObjects['green'];
        const redLight = pedestrianObjects['red'];

            turnOffLight(redLight);
            showLight(greenLight);
            await delay(greenLight.activeTime);
            turnOffLight(greenLight);
       
    }
//corect++
    
    function showLight(lightObject); {
        const light = lightObject.element;
        light.classList.add('active');
    }
//corect++
    function turnOffLight(lightObject) {
        const light = lightObject.element;
        light.classList.remove('active');
    }
//correct
    function initialState(){
        showLight(lightObjects['green']);
        showLight(pedestrianObjects['red']);
    }
//correct
    async function controlLight() {
        initialState();
        await domEventPromise(pedestrianButton, 'click');
        trafficLight(lightObjects, true);
        await pedestrianTrafficLight();
    }
//correct
    function domEventPromise(element, eventName) {
        const resolver = (event) => {
            resolver(event);
        };

        return new Promise((resolve) => {
            element.addEventListener(eventName, (event) => resolver(resolve, event));
        }).then(() => {
            element.removeEventListener(eventName, resolver);
        });

        // const event = await new Promise ((resolve) => {
        //      element.addEventListener(eventName, (event) => resolver(resolve< event));
        //  });
        // element.removeEventListener(eventName, resolver);
        //  return event;
    }
//correct

    const pedestrianButton = document.getElementById('pedestrian-button');
//correct

    async function startTrafficLight(){
        while(true){
            await controlLight();

        }
    }
    startTrafficLight();
};



