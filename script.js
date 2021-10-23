
document.onload = () => {
    const isActiveTrafficLight = true ;
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

    const redLight = document.getElementById('red');
    const yellowLight = document.getElementById('yellow');
    const greenLight = document.getElementById('green');

    const pedestrianRedLight = document.getElementById('pedestrian-red');
    const pedestrianGreenLight = document.getElementById('pedestrian-green');
    const lightsObj = {
        activeTime: 0,
        element: null
    }

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
    }

    const pedestrianObjects = {
        red: {
            activeTime: 10000,
            element: pedestrianRedLight
        },
        green: {
            activeTime: 5000,
            element: pedestrianGreenLight
        },
    }

    async function activateTrafficLight(lightObjects, lightColor) {
        const light = lightObjects[lightColor]
        showLight(light);
       
    }
    async function trafficLight(lightObjects) {
        turnOffLight(lightObject['green']);
        activateTrafficLight(lightObjects, 'yellow');
        await delay(lightObjects['yellow'].activeTime);
        turnOffLight(lightObjects, 'red');
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
    
    function showLight(lightObjects) {
        const light = lightObjects.element;
        light.classList.add('active');
    }
    function turnOffLight(lightObjects) {
        const light = lightObjects.element;
        light.classList.remove('active');
    }

    function initialState(){
        showLight(lightObjects['green']);
        showLight(pedestrianObjects['red']);
    }
    async function controlLight() {
        initialState();
        await domEventPromise(pedestrianButton, 'click');
        trafficLight(lightObjects, true);
        await pedestrianTrafficLight();
    }
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

    const pedestrianButton = document.getElementById('pedestrian-button');

    async function startTrafficLight(){
        while(true){
            await controlLight();

        }
    }
    startTrafficLight();
};



