'use strict';

angular.module('starter')

.controller('SettingCtrl', ['$rootScope', '$scope', '$state', '$http', '$auth',
	function($rootScope, $scope, $state, $http, $auth) {

  $scope.saveCustomer = saveCustomer;
  $scope.payment = {};
  $scope.slider = {
    value: 10,
    options: {
      ceil: 60,
      showSelectionBar: true,
      getSelectionBarColor: function(value) {
        if (value <= 60) return 'red';
      },

      translate: function(value) {
        return  value + 'km';
      }
    }
  };

  // Sign Out

  $scope.signOut = signOut;
  
  function signOut() {
    $auth.signOut()
      .then(function(resp) {
        $state.go('login');
        // $scope.authenticated = false;
      })
      .catch(function(resp) {
      });
  }

  // Register Payment with Stripe
 	function saveCustomer (status, response) {
 		if(response.error){
 			console.log('Payment Error:', response.error.message);
 		}else{
 			console.log('Payment Success:', response)
	 		$scope.payment = response.id;

	    $http.post('http://localhost:3000/api/v1/users/', {stripeToken: $scope.payment})
	    .then(success, error);
		    // success
		    function success(resp) {
		      console.log('Payment Register result: ', resp);
		      alert('Payment Successfuly Registered')
		    }
		    // error
		    function error(resp) {
		      console.log(resp);
		    }
 			}
  };

  // Go to Report Page
  
  $scope.report = report;

  function report() {
  	$state.go('goReport')
  }

  // Go to Privacy Page
  
  $scope.privacyPolicy = privacyPolicy;

  function privacyPolicy() {
  	$state.go('goPolicy')
  }

  // Scan Credit Card Number

  var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        app.example();
    },

    example : function () {
      var cardIOResponseFields = [
        "cardType",
        "redactedCardNumber",
        "cardNumber",
        "expiryMonth",
        "expiryYear",
        "cvv",
        "postalCode"
      ];

      var onCardIOComplete = function(response) {
        console.log("card.io scan complete");
        for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
          var field = cardIOResponseFields[i];
          console.log(field + ": " + response[field]);
        }
      };

      var onCardIOCancel = function() {
        console.log("card.io scan cancelled");
      };

      var onCardIOCheck = function (canScan) {
      	debugger;
        console.log("card.io canScan? " + canScan);
        var scanBtn = document.getElementById("scanBtn");
        if (!canScan) {
          scanBtn.innerHTML = "Manual entry";
        }
        scanBtn.onclick = function (e) {
          CardIO.scan({
              "requireExpiry": true,
              "requireCVV": false,
              "requirePostalCode": false,
              "restrictPostalCodeToNumericOnly": true
            },
            onCardIOComplete,
            onCardIOCancel
          );
        }
      };

      CardIO.canScan(onCardIOCheck);
    }
  };

  app.initialize();

}]);
