angular.module('starter')
    .factory('BaseData', function () {
        'use strict';
        var today = new Date();
        var offsetDay = 1;
        if (today.getHours() > 1) offsetDay++;

        var minDate = new Date(today);
        minDate.setDate(minDate.getDate() + offsetDay);


        return {
            marketLocation: 'Denver',
            min_date: minDate,
            pickup_date: minDate,
            address: "",
            zipcode: "",
            pickup_time: "AM",
            container_size: 2,
            card_expiration_year: today.getFullYear(),
            card_expiration_month: today.getMonth() + 1,
            email: '',
            mobile: '',
            card_number: '',
            name: '',
            cvv: '',
            cost: 80.0,
            userCurrentLocationLat: null,
            userCurrentLocationLong: null,
            client_address: '',
            client_zipcode: ''
        };
    });
