var fs = require('fs');
var guess = [ [ [1, 1, 1, 13, 2, 4, 2, 3, 1, 12], 0 ],
  [ [3, 12, 3, 2, 3, 11, 4, 5, 2, 5], 1 ],
  [ [2, 11, 2, 3, 4, 3, 4, 11, 1, 6], 2],
  [ [1, 9, 1, 6, 4, ,5, 3, 5, 1, 5], 3],
  [ [4, 10, 4, 11, 4, 1, 4, 13, 4, 12], 9 ]];
var nodesvm = require('node-svm');
var _a = require('mout/array');
var persistedModel = JSON.parse(fs.readFileSync('./model/model_size_all.json'));
var testingData = './src/testing_set_size_500.t';
var clf = nodesvm.restore(persistedModel);
var n = 0;
var testingDataSize = 25;
var testingSet;

guess.forEach(function (ex) {
	var prediction = clf.predictSync(ex[0]);
	console.log(' { expected: %d, predicted: %d}', ex[1], prediction);
});

nodesvm.read(testingData)
    .then(function (dataset) {
      testingSet = dataset;
    })
    .fail(function (err) {
        throw err;
    })
    .done(function (dataset) {
         _a.pick(testingSet, testingDataSize).forEach(function (ex, i) {
             var prediction = clf.predictSync(ex[0]);
             console.log(' { #%d, expected: %d, predicted: %d}',i+1, ex[1], prediction);
             if (ex[1] == prediction) {
                 n++;
             } else {
                 //console.log(' { #%d, expected: %d, predicted: %d}',i+1, ex[1], prediction);
             }

         });
       
        console.log('Accuracy: ' + (n/testingDataSize)*100 + '%');
        console.log('done.');
    });
