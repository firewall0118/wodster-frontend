// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngFileUpload', 'ngMessages', 'starter.controllers',
  'starter.services', 'ng-token-auth', 'LocalStorageModule', 'stripe', 'uiSwitch', 'rzModule', 'ngProgress'])

.run(['$ionicPlatform', '$rootScope', '$state', '$location', '$http', '$auth', 'Auth', 'localStorageService', function($ionicPlatform, $rootScope, $state, $location, $http, $auth, Auth, localStorageService) {

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })                                                                                                                              

  $rootScope.globals = localStorageService.get('globals') || {};
  $rootScope.authenticated = false;

  if ($rootScope.globals.currentUser) {
    $rootScope.authenticated = true;
  }

  // gapi.load('auth2', function() {
  //   gapi.auth2.init();
  // });

  // $rootScope.$on('$locationChangeStart', function (event, next, current) {
  //   // redirect to login page if not logged in and trying to access a restricted page
  //   var restrictedPage = $.inArray($location.path(), ['/', '/signin', '/signup']) === -1;
  //   var loggedIn = $rootScope.globals.currentUser;
  //   if (restrictedPage && !loggedIn)                                                                                                          {
  //     $location.path('/signin');
  //   }
  // });

  // // signout
// $rootScope.signOut = function() {
  //   var auth2 = gapi.auth2.getAuthInstance();                              
  //   if(auth2) {
  //     auth2.signOut().then(function () {        
  //       Auth.clearCrepdentials();
  //       $location.path('/signin');
  //     });
  //     auth2.disconnect();
  //   } else {
      // if($rootScope.authenticated) {
      //   Auth.clearCredentials();
      //   $location.path('/signin');
      // }  
    //}
  // };

  $rootScope.goSearch = function() {
    $state.go( 'tabs.search' );
  };
  $rootScope.goSetting = function() {
   
    var tab_setting = angular.element( document.querySelector( '#search_setting' ));
    tab_setting.addClass("tab-item-active")
  
    $state.go( 'tabs.setting' );
  };
  $rootScope.goExplore = function() {

    $state.go( 'tabs.explore' );
  };
  $rootScope.goMap = function() {
    $state.go( 'map' );
  }; $rootScope.goPerson = function() {
    $state.go( 'tabs.person' );
  };
  

}])

.constant('config', {
  // for development
  'apiUrl': 'http://localhost:3000/api/v1',
  'confirmationSuccessUrl': 'http://localhost:3000/#',
  'authProviderPaths': {
    facebook: '/auth/facebook'
  }
})

.config(['$stateProvider', '$urlRouterProvider', '$authProvider', 'config', function($stateProvider, $urlRouterProvider, $authProvider, config) {
  Stripe.setPublishableKey('pk_test_KmWhclrAbvfHPVubarpG6enr');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: "HomeCtrl",
      data: {
        public: true
      }
    })
    // the signup route
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: "SignupCtrl",
      data: {
        public: true
      }
    })
    // the login route
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      data: {
        public: true
      }
    })

    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.explore', {
      url: "/explore",
      views: {
        'explore-tab': {
          templateUrl: "templates/tab/explore.html",
          controller: 'ExploreCtrl'
        }
      }
    })
    .state('tabs.search', {
      url: "/search",
      views: {
        'search-tab': {
          templateUrl: "templates/tab/search.html",
          controller: 'SearchCtrl'
        }
      }
    })
    .state('tabs.setting', {
      url: "/setting",
      views: {
        'setting-tab': {
          templateUrl: "templates/tab/setting.html",
          controller: 'SettingCtrl'
        }
      }
    })
    .state('tabs.map', {
      url: "/map",
      views: {
        'map-tab': {
          templateUrl: "templates/tab/map.html",
          controller: 'MapCtrl'
        }
      }
    })
    .state('tabs.person', {
      url: "/person",
      views: {
        'person-tab': {
          templateUrl: "templates/tab/person.html",
          controller: 'PersonCtrl'
        }
      }
    })
    // the explore route
    // .state('explore', {
    //   url: '/explore',
    //   templateUrl: 'templates/tab/explore.html',
    //   controller: 'ExploreCtrl',
    //   params: {
    //     user_id: null
    //   },
    //   data: {
    //     public: true
    //   },
    //   resolve: {
    //     auth: function($auth) {
    //       return $auth.validateUser();
    //     }
    //   }
    // })

    // .state('search', {
    //   url: '/search',
    //   templateUrl: 'templates/tab/search.html',
    //   controller: "SearchCtrl",
    //   params: {
    //     user_id: null,
    //     category_id: null,
    //     category_name: null
    //   },   
    //   data: {
    //     public: true
    //   },
    //   resolve: {
    //     auth: function($auth) {
    //       return $auth.validateUser();
    //     }
    //   }
    // })

    // .state('setting', {
    //   url: '/setting',
    //   templateUrl: 'templates/tab/setting.html',
    //   controller: "SettingCtrl",
    //   data: {
    //     public: true
    //   },
    //   resolve: {
    //     auth: function($auth) {
    //       return $auth.validateUser();
    //     }
    //   }
    // })

    // .state('map', {
    //   url: '/map',
    //   templateUrl: 'templates/tab/map.html',
    //   controller: "MapCtrl",
    //   data: {
    //     public: true
    //   },
    //   resolve: {
    //     auth: function($auth) {
    //       return $auth.validateUser();
    //     }
    //   }
    // })

    // .state('person', {
    //   url: '/person',
    //   templateUrl: 'templates/tab/person.html',
    //   controller: "PersonCtrl",
    //   data: {
    //     public: true
    //   },
    //   resolve: {
    //     auth: function($auth) {
    //       return $auth.validateUser();
    //     }
    //   }
    // })

    .state('result', {
      url: '/result',
      templateUrl: 'templates/tab/result.html',
      controller: "ResultCtrl",
      params: {
        user_id: null,
        category_id: null,
        category_name: null,
        wod_id: null,
        name: null,
        wod_datetime: null,
        wod_time: null,
        location: null,
        capacity: null,
        description: null,
        center_id: null
      },
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })

    .state('description', {
      url: '/description',
      templateUrl: 'templates/tab/description.html',
      controller: "DescriptionCtrl",
      params: {
        user_id: null,
        category_id: null,
        category_name: null,
        wod_id: null,
        name: null,
        wod_datetime: null,
        wod_time: null,
        location: null,
        capacity: null,
        description: null,
        center_name: null,
        center_id: null

      },
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('coach_profile', {
      url: '/coach-profile',
      templateUrl: 'templates/tab/coach_profile.html',
      controller: "CoachProfileCtrl",
      params: {
        user_id: null,
        coach_name: null, 
        coach_id: null,
        coach_duty: null,
        wod_id: null,
        center_id: null,
        category_id: null,
        category_name: null
      },
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('modal', {
      url: '/modal',
      templateUrl: 'templates/modal.html',
      controller: "DescriptionCtrl"
    })

    .state('coach-modal', {
      url: '/coach-modal',
      templateUrl: 'templates/coach-modal.html',
      controller: "PersonCtrl"
    })

    .state('userCoachProfile', {
      url: '/userCoachProfile',
      templateUrl: 'templates/tab/user_coach_profile.html',
      controller: "UserCoachProfileCtrl",
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })

    .state('goCreateWod', {
      url: '/createWod',
      templateUrl: 'templates/tab/create_wod.html',
      controller: "CreateWodCtrl",
      params: {
        category_name: null,
        center_id: null
      },
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })

    .state('goReport', {
      url: '/report',
      templateUrl: 'templates/tab/report.html',
      controller: "SettingCtrl",
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })
    
    .state('goPolicy', {
      url: '/privacy-policy',
      templateUrl: 'templates/tab/policy.html',
      controller: "SettingCtrl",
      data: {
        public: true
      },
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })

  $urlRouterProvider.otherwise('/');

  $authProvider.configure({
    'apiUrl': config.apiUrl,
    'confirmationSuccessUrl': config.confirmationSuccessUrl,
    'authProviderPaths': {
      facebook: config.authProviderPaths.facebook,
      google:   config.authProviderPaths.google
    }
  });
}]);
