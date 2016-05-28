var fs = require('fs');
var svm = require('node-svm');
var clf = new svm.NuSVC();
var modelPath = './model/poker_sim_test.json';
var trainFile = './src/poker_sim_test.t';
var guess = [4, 10, 4, 11, 4, 1, 4, 13, 4, 12];

var persistedModel = JSON.parse(fs.readFileSync('./model/poker_sim_test.json')); // read persisted model
var clf = new svm.NuSVC({ model: persistedModel });
console.log(clf);
//var prediction = clf.predict(guess);
//console.log(' { guess, expected: %d, predicted: %d}', 9, prediction);

svm.read(trainFile)
.then(function(dataset){
    return clf.train(dataset);
})
.then(function(trainedModel, trainingReport){
     return svm.read(testFile);
})
.then(function(testset){
    return clf.evaluate(testset);
})
.done(function(report){
    console.log(report);
});
