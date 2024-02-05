const { ref, computed } = Vue;

const App = {
  setup() {
    const command = ref('');
    const robot = ref({ x: null, y: null, facing: null });

    const executeCommand = () => {
      const commandParts = command.value.split(' ');
      const action = commandParts[0].toUpperCase();

      switch (action) {
        case 'PLACE':
          const placeArgs = commandParts[1].split(',');
          const x = parseInt(placeArgs[0]);
          const y = parseInt(placeArgs[1]);
          const facing = placeArgs[2];
          place(x, y, facing);
          break;

        case 'MOVE':
          move();
          console.log('MOVE');
          break;

        case 'LEFT':
          left();
          break;

        case 'RIGHT':
          right();
          break;

        case 'REPORT':
          break;

        default:
          console.log('Invalid command');
          break;
      }
    };

    const place = (x, y, facing) => {
      if (isValidPosition(x, y) && isValidFacing(facing)) {
        robot.value.x = x;
        robot.value.y = y;
        robot.value.facing = facing;
      }
    };

    const move = () => {
      if (!isPlaced()) return;

      let newX = robot.value.x;
      let newY = robot.value.y;

      switch (robot.value.facing) {
        case "NORTH":
          newY++;
          break;
        case "SOUTH":
          newY--;
          break;
        case "EAST":
          newX++;
          break;
        case "WEST":
          newX--;
          break;
      }

      if (isValidPosition(newX, newY)) {
        robot.value.x = newX;
        robot.value.y = newY;
      }
    };

    const left = () => {
      if (!isPlaced()) return;

      const directions = ["NORTH", "WEST", "SOUTH", "EAST"];
      const currentIndex = directions.indexOf(robot.value.facing);
      const newFacing = directions[(currentIndex + 1) % directions.length];

      robot.value.facing = newFacing;
    };

    const right = () => {
      if (!isPlaced()) return;

      const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
      const currentIndex = directions.indexOf(robot.value.facing);
      const newFacing = directions[(currentIndex + 1) % directions.length];

      robot.value.facing = newFacing;
    };

    const isValidPosition = (x, y) => x >= 0 && x < 5 && y >= 0 && y < 5;
    const isValidFacing = (facing) => ["NORTH", "SOUTH", "EAST", "WEST"].includes(facing);
    const isPlaced = () => robot.value.x !== null && robot.value.y !== null && robot.value.facing !== null;

    const robotStatus = computed(() => {
      if (!isPlaced()) return "Robot is not placed on the table.";
      return `${robot.value.x},${robot.value.y},${robot.value.facing}`;
    });

    return { command, executeCommand, robotStatus };
  },
};

Vue.createApp(App).mount('#app');
