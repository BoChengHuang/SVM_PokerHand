# SVM_PokerHand
Use SVM to predict poker hand ramdomly.

![Node.js](https://img.shields.io/badge/Node.js-4.4.3-orange.svg)
![Platforms Mac | Windows | Linux](https://img.shields.io/badge/Platforms-Mac%20%7C%20Windows%20%7C%20Mac%20-lightgray.svg)

# What is this repository for? ###

* Quick summary: Use SVM to predict poker hand ramdomly.
* Version 2.0.2

# How do I get set up? (just node.js in terminal)###

* Install Node.js
* '$ npm install' in cmd/terminal first to intstall [node-svm](https://github.com/nicolaspanel/node-svm).
* If you can't run it please use '$ npm install --save node-svm'.
* '$ node train.js' to train small training data and predict/evaluate testing data by modify parameters in train.js.
* If you want to build a model for latter use. Please use '$ node-svm train <dataset file> [<where to save the prediction model>] [<options>]'
* '$ node predict.js' to predict small data by modfify a 1-D array.

# How do I get set up? (host in localhost, and play on website)###
* Install Node.js
* cd/to/path, '$ npm install'
* '$ node index.js' to host
* open web browser to localhost:1234
* enjoy


# Contribution guidelines ###
* Bo Cheng Huang
* node-svm in Libsvm
* socket.io
