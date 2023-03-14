export const state = {
  record: {
    personalInfo: {},
    paymentPlan: {},
    yearly: new Boolean(),
    addOns: {
      onlineService: 0,
      largerStorage: 0,
      customProfile: 0,
    },
    total: new Number(),
  },
  page: `personal-info`,
  plans: {
    yearly: true,
    arcade: [9, 90],
    advanced: [12, 120],
    pro: [15, 150],
  },
  addOns: {
    onlineService: [1, 10],
    largerStorage: [2, 20],
    customProfile: [2, 20],
  },
};

export const holdPersonalInfo = function (data) {
  state.record.personalInfo = data;
};

export const yearlyPlanSelect = function (data) {
  state.plans.yearly = data;
};

export const setPage = function (data) {
  state.page = data;
};

export const holdPaymentPlan = function (data) {
  state.record.paymentPlan.planType = data.plan_type;
  state.record.paymentPlan.paymentValue = +data.select_plan;
  state.record.yearly = data.yearly === `on` ? true : false;
};

export const resetAddOns = function () {
  state.record.addOns = {
    onlineService: 0,
    largerStorage: 0,
    customProfile: 0,
  };
};

export const holdAddOns = function (data) {
  if (!data) return;
  state.record.addOns.onlineService = data.online_service
    ? +data.online_service
    : 0;
  state.record.addOns.largerStorage = data.larger_storage
    ? +data.larger_storage
    : 0;
  state.record.addOns.customProfile = data.custom_profile
    ? +data.custom_profile
    : 0;
};

export const setTotal = function () {
  const totalAddOns = Array.from(Object.values(state.record.addOns)).reduce(
    (arr, cur) => cur + arr
  );
  state.record.total = state.record.paymentPlan.paymentValue + totalAddOns;
};

const setYearly = function () {
  if (state.yearly === false) state.plans.yearly = state.yearly;
};

const init = function () {
  setYearly();
};

init();
