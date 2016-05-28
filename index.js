'use strict';
var fs = require('fs');
var so = require('stringify-object');
var svm = require('node-svm');
var _a = require('mout/array');
var trainingData = './src/poker_sim_test';
var testingData = './src/poker_sim_test.t';
//var trainingData = './src/poker';
//var testingData = './src/poker.t';
var n = 0;
var testingDataSize = 500;
var testingSet;

var guess = [4, 10, 4, 11, 4, 1, 4, 13, 4, 12];

var clf = new svm.NuSVC({
    kFold: 4,
    normalize: false,
    reduce: false,
    kernelType: 'RBF',
    gamma: [0.03125, 0.125, 0.5, 2, 8]
});

svm.read(testingData)
    .then(function (dataset) {
        testingSet = dataset;
    })
    .fail(function (err) {
            throw err;
        })
    .done(function () {
        console.log('testing set done.');
    });

svm.read(trainingData)
    .then(function (dataset) {
        // train the svm with entire dataset
        return clf.train(dataset)
            .progress(function(progress){
                console.log('training progress: %d%', Math.round(progress*100));
            })
            .spread(function (model, report) {
                console.log('SVM trained. \nReport :\n%s', so(report));
                fs.writeFileSync('./model/poker_sim_test.json', JSON.stringify(model));  // persist the model
                return dataset;
            });
    })
    .then(function (testSet) {

    })
    .fail(function (err) {
        throw err;
    })
    .done(function () {
        // randomly pick m values and display predictions
         _a.pick(testingSet, testingDataSize).forEach(function (ex, i) {
             var prediction = clf.predictSync(ex[0]);

             if (ex[1] == prediction) {
                 n++;
             } else {
                 //console.log(' { #%d, expected: %d, predicted: %d}',i+1, ex[1], prediction);
             }

         });
        // var prediction = clf.predictSync(guess);
        // console.log(' { guess, expected: %d, predicted: %d}', 9, prediction);
        console.log('Accuracy: ' + (n/testingDataSize)*100 + '%');
        console.log('done.');
    });
