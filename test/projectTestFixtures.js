var jsdom = require('mocha-jsdom');
var fs = require("fs");
var path = require("path");

function importTest(path) {
    require(path);
}

describe("..:: Intend Test Fixtures ::..", function () {
    jsdom();
    importTest('./articleCollectionViewTestFixture');
    importTest('./articleDetailViewTestFixture');
    importTest('./articleFormViewTestFixture');
    importTest('./articleListItemViewTestFixture');
    importTest('./articleRepositoryTestFixture');
    importTest('./articleRequestHandlerTestFixture');
    importTest('./articleValidatorTestFixture');
    importTest('./errorBinderTestFixture');
    importTest('./fullArticleValidatorTestFixture');
    importTest('./loginClientSideValidatorTestFixture');
    importTest('./tooltipCollectionViewTestFixture');
    importTest('./tooltipCollectionInjectionViewTestFixture');
    importTest('./tooltipFormViewTestFixture');
    importTest('./tooltipInjectionViewTestFixture');
    importTest('./tooltipListItemViewTestFixture');
    importTest('./tooltipRepositoryTestFixture');
    importTest('./tooltipRequestHandlerTestFixture');
    importTest('./tooltipValidatorTestFixture');
    importTest('./userManagerTestFixture');
    importTest('./userRepositoryTestFixture');
});