var fs = require('fs');
var guess = [ [ [1, 1, 1, 13, 2, 4, 2, 3, 1, 12], 0 ],
  [ [3, 12, 3, 2, 3, 11, 4, 5, 2, 5], 1 ],
  [ [4, 10, 4, 11, 4, 1, 4, 13, 4, 12], 9 ]];
var nodesvm = require('node-svm');
var persistedModel = JSON.parse(fs.readFileSync('./model/model_size_100.json'));
var clf = nodesvm.restore(persistedModel);

guess.forEach(function (ex) {
	var prediction = clf.predictSync(ex[0]);
	console.log(' { expected: %d, predicted: %d}', ex[1], prediction);
});
