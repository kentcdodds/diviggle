(function() {
  'use strict';
  /* global _: false */

  var app = angular.module('dv.common.constants');

  var customFaker = {
    macAddress: function() {
      var mac = '54:52:00';

      for (var i = 0; i < 6; i++) {
        if (i%2 === 0) {
          mac += ':';
        }
        mac += Math.floor(Math.random()*16).toString(16);
      }

      return mac;
    },
    getNextId: (function() {
      var id = 0;
      return function() {
        id++;
        return id;
      };
    })(),
    randomBoolean: function(likelihoodOfTrue) {
      return Math.random() < (likelihoodOfTrue || 0.5);
    }
  };

  var creators = {
    user: createUser,
    company: createCompany,
    lock: createLock,
    key: createKey,
    createXOfX: function(what, howMany) {
      var xes = [];
      for (var i = 0; i < howMany; i++) {
        xes.push(creators[what]());
      }
      return xes;
    }
  };

  var users = creators.createXOfX('user', 5);
  var companies = creators.createXOfX('company', 5);
  var locks = creators.createXOfX('lock', 25);
  var keys = creators.createXOfX('key', 25);

  var idLocks = _.clone(locks, true);
  _.each(idLocks, function(lock) {
    lock.user = lock.user.id;
    lock.company = lock.company.id;
  });

  app.constant('fakeLocks', locks);
  app.constant('fakeUsers', users);
  app.constant('fakeCompanies', companies);
  app.constant('fakeKeys', companies);
  app.constant('fakeData', {
    locks: locks,
    idLocks: idLocks,
    users: users,
    companies: companies,
    keys: keys
  });


  // FUNCTIONS
  function createUser() {
    return {
      id: customFaker.getNextId(),
      firstName: Faker.Name.firstName(),
      lastName: Faker.Name.lastName(),
      bio: Faker.Company.catchPhrase(),
      avatarUrl: Faker.Image.avatar()
    };
  }

  function createCompany() {
    return {
      id: customFaker.getNextId(),
      name: Faker.Company.companyName(),
      address1: Faker.Address.streetAddress(),
      address2: Faker.Address.secondaryAddress(),
      city: Faker.Address.city(),
      state: Faker.Address.usState(true),
      zipcode: Faker.Address.zipCode(),
      logo: Faker.Image.abstractImage(),
      phone: Faker.PhoneNumber.phoneNumber()
    };
  }

  function createLock() {
    return {
      id: customFaker.getNextId(),
      name: Faker.Address.streetName(),
      serialNum: Faker.Helpers.randomNumber(10000000),
      macAddress: customFaker.macAddress(),
      preSharedKey: '',
      staticCode: Faker.Helpers.randomNumber(10000000),
      status: Faker.Lorem.words(2).join(' '),
      lockType: 'static',
      description: Faker.Lorem.words(Faker.Helpers.randomNumber(10)).join(' '),
      isActive: true,
      company: !_.isEmpty(companies) ? _.random(companies) : createCompany(),
      user: !_.isEmpty(users) ? _.random(users) : createUser()
    };
  }

  var keyTypes = ['access_window', 'recurring', 'anytime'];

  function createKey() {
    var type = _.random(keyTypes);
    return {
      id: customFaker.getNextId(),
      startTime: Faker.Date.past(),
      endTime: /access_window/.test(type) ? Faker.Date.future() : 'N/A',
      type: type,
      createdAt: Faker.Date.past(),
      updatedAt: Faker.Date.recent(),
      isActive: customFaker.randomBoolean(0.7),
      lock: !_.isEmpty(locks) ? _.random(locks) : createLock(),
      user: !_.isEmpty(users) ? _.random(users) : createUser()
    };
  }
})();