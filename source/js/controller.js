import * as model from "./model";
import personalInfoView from "./view/personalInfoView";
import selecPlanView from "./view/selecPlanView";
import selecPlanView from "./view/selecPlanView";
import sidebarView from "./view/sidebarView";
import addOnsView from "./view/addOnsView";
import summaryView from "./view/summaryView";
import thankYouView from "./view/thankYouView";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept();
}

const personalInfoController = function () {
  personalInfoView.render(model.state.record.personalInfo);
  sidebarView.render(model.state, false);
};

const personalInfoSubmitController = function (data, goTo) {
  if (!personalInfoView.dataValidation()) return;
  model.holdPersonalInfo(data);
  model.setPage(goTo);
  selecPlanView.render(model.state);
  sidebarView.update(model.state);
};

const yearlyPlanController = function (data) {
  model.yearlyPlanSelect(data);
  selecPlanView.render(model.state);
};

const planClickController = function (data) {
  model.holdPaymentPlan(data);
  model.resetAddOns();
};

const planSubmitController = function (goTo) {
  if (!selecPlanView.dataValidation()) return;
  model.setPage(goTo);
  addOnsView.render(model.state);
  sidebarView.update(model.state);
};

const selecPlanGoBackController = function (goTo) {
  personalInfoView.render(model.state.record.personalInfo);
  model.setPage(goTo);
  sidebarView.update(model.state);
};

const addOnsClickController = function (data) {
  model.holdAddOns(data);
  model.setTotal();
};

const addOnsSubmitController = function (goTo) {
  model.setPage(goTo);
  summaryView.render(model.state.record);
  sidebarView.update(model.state);
};

const addOnsGoBackController = function (goTo) {
  selecPlanView.render(model.state);
  model.setPage(goTo);
  sidebarView.update(model.state);
};

const summaryChangePlanController = function (goTo) {
  selecPlanView.render(model.state);
  model.setPage(goTo);
  sidebarView.update(model.state);
};

const summarySubmitController = function (goTo) {
  thankYouView.render(model.state);
  model.setPage(goTo);
  sidebarView.update(model.state);
};

const summaryGoBackController = function (goTo) {
  addOnsView.render(model.state);
  model.setPage(goTo);
  sidebarView.update(model.state);
};

const init = function () {
  personalInfoView.addHandlerPersonalInfo(personalInfoController);
  personalInfoView.addHandlerPersonalInfoSubmit(personalInfoSubmitController);
  selecPlanView.addHandlerYearlyPlan(yearlyPlanController);
  selecPlanView.addHandlerClickPlan(planClickController);
  selecPlanView.addHandlerSubmitPlan(planSubmitController);
  selecPlanView.addHandlerPlanGoBack(selecPlanGoBackController);
  addOnsView.addHandlerClickAnnOns(addOnsClickController);
  addOnsView.addHandlerSubmitAddOns(addOnsSubmitController);
  addOnsView.addHandlerAddOnsGoBack(addOnsGoBackController);
  summaryView.addHandlerChangePlan(summaryChangePlanController);
  summaryView.addHandlerSummarySubmit(summarySubmitController);
  summaryView.addHandlerSummaryGoBack(summaryGoBackController);
};

init();
