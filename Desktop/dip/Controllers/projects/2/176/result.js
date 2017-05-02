
var parallel = require('../../../parallel.js');
var fs = require('fs');
var source = parallel.readCore(__dirname + "/core.cl");
var kern = parallel.buildProgram(source, "core");
			
			var entering_B = [];
var number_B = [];
var graph_B = [];
var circle_B = [];
var nodes_B = [];
var emptySlot_B = [];
var requestedSlot_B = [];
var numberOfJobs_B = [];
var workersWaiting_B = [];
var slotLength_B = [];
var front_B = [];
var circle = [];
var nodes = [];
var emptySlot = [];
var requestedSlot = [];
var numberOfJobs = [];
var workersWaiting = [];
var slotLength = [];
var front = [];

var graph_js = [2,14,0,0,0,0,0,0,0,0,0,0,0,0,
1,3,14,0,0,0,0,0,0,0,0,0,0,0,
2,4,5,14,0,0,0,0,0,0,0,0,0,0,
3,5,0,0,0,0,0,0,0,0,0,0,0,0,
3,4,6,9,0,0,0,0,0,0,0,0,0,0,
5,7,0,0,0,0,0,0,0,0,0,0,0,0,
6,8,0,0,0,0,0,0,0,0,0,0,0,0,
7,9,0,0,0,0,0,0,0,0,0,0,0,0,
5,8,10,0,0,0,0,0,0,0,0,0,0,0,
9,11,0,0,0,0,0,0,0,0,0,0,0,0,
10,12,13,14,0,0,0,0,0,0,0,0,0,0,
11,13,0,0,0,0,0,0,0,0,0,0,0,0,
11,12,14,0,0,0,0,0,0,0,0,0,0,0,
1,2,3,11,13,0,0,0,0,0,0,0,0,0];

var graph = Uint32Array.from(graph_js);

var nodes_count = 14;

entering = parallel.zeroFill(nodes_count);
number = parallel.zeroFill(nodes_count);
emptySlot = parallel.zeroFill(nodes_count);
requestedSlot = parallel.zeroFill(nodes_count);
slotLength = parallel.zeroFill(nodes_count);
front = parallel.zeroFill(1000000);
circle = parallel.zeroFill(nodes_count);
nodes = parallel.zeroFill(1);
numberOfJobs = parallel.zeroFill(1);
workersWaiting = parallel.zeroFill(1);
circle[0] = -1;
nodes[0] = nodes_count;
numberOfJobs [0] = 0;
workersWaiting [0] = 0;


entering_B = parallel.copy(entering);
number_B = parallel.copy(number);
graph_B = parallel.copy(graph);
nodes_B = parallel.copy(nodes);
circle_B = parallel.copy(circle);
emptySlot_B = parallel.copy(emptySlot);
requestedSlot_B = parallel.copy(requestedSlot);
numberOfJobs_B = parallel.copy(numberOfJobs);
workersWaiting_B = parallel.copy(workersWaiting);
slotLength_B = parallel.copy(slotLength);
front_B = parallel.copy(front);parallel.parameter(kern, 0, entering_B);
parallel.parameter(kern, 1, number_B);
parallel.parameter(kern, 2, graph_B);
parallel.parameter(kern, 3, nodes_B);
parallel.parameter(kern, 4, circle_B);
parallel.parameter(kern, 5, emptySlot_B);
parallel.parameter(kern, 6, requestedSlot_B);
parallel.parameter(kern, 7, numberOfJobs_B);
parallel.parameter(kern, 8, workersWaiting_B);
parallel.parameter(kern, 9, slotLength_B);
parallel.parameter(kern, 10, front_B);

var cq = parallel.run(kern, 1, 5);
