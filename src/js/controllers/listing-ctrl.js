'use strict';

var $ = require('jquery');
var router = require('../router');
var settings = require('../settings');
var EtsyService = require('../services/etsy-service');
var view = require('../utils/view');
var queryString = require('../utils/query-string');

router.route('listings/:id', function (id) {
  // TODO: Show the listing details page, load listing by id from Etsy, etc...
  var etsy = new EtsyService({ apiKey: settings.etsyApiKey });
  var searchValues = queryString(query);

  etsy.listing(id)
    .done(showListing)
    .fail(showError);

    function showListing (listing) {
      // Show data as HTML

      console.log(listing);
      console.log({
        searchValues: searchValues,
        listings: listing.results.map(viewModel)
      });

      view.render('listings', {
        searchValues: searchValues,
        listings: listing.results.map(viewModel)
      });

    }

    function showError(req, status, err) {
      console.error(err || status);
      alert('Ruh roh!');
    }

});

function viewModel(listing) {
  return {
    id: listing.listing_id,
    imgUrl: listing.MainImage.url_170x135,
    description: listing.description,
    price: listing.price,
    tags: listing.tags,
    breadCrumb: listing.taxonomy_path,
    title: listing.title,
    externalUrl: listing.url,
    userId: listing.user_id
  };
}
