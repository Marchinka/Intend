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
    importTest('./articleRouterTestFixture');
    importTest('./articleValidatorTestFixture');
    importTest('./backOfficeRouterTestFixture');
    importTest('./errorBinderTestFixture');
    importTest('./exerciseRouterTestFixture');
    importTest('./homeRouterTestFixture');
    importTest('./loginClientSideValidatorTestFixture');
    importTest('./tooltipCollectionViewTestFixture');
    importTest('./tooltipCollectionInjectionViewTestFixture');
    importTest('./tooltipFormViewTestFixture');
    importTest('./tooltipInjectionViewTestFixture');
    importTest('./tooltipListItemViewTestFixture');
    importTest('./tooltipRepositoryTestFixture');
    importTest('./tooltipRequestHandlerTestFixture');
    importTest('./tooltipRouterTestFixture');
    importTest('./tooltipValidatorTestFixture');
    importTest('./userManagerTestFixture');
    importTest('./userRepositoryTestFixture');
    importTest('./userRouterTestFixture');
});