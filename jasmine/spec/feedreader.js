/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test will loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have valid urls for each feed', function() {
      allFeeds.forEach(function(e) {
        expect(e.url).toBeDefined();
        expect(e.url.length).not.toBe(0);
      });
    });

    /* This test will loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have valid names for each feed', function() {
      allFeeds.map(function(e) {
        expect(e.name).toBeDefined();
        expect(e.name.length).not.toBe(0);
      });
    });
  });


  /* new test suite named "The menu" */
  describe('The menu', function() {
    // This test ensures the menu element is hidden by default
    const body = document.querySelector('body');
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true); // using jQuery hasClass
      // expect(body.classList).toContain('menu-hidden');
    });

    /* This test ensures the menu changes
     * visibility when the menu icon is clicked.
     * There are two expectations:
     * the menu display when clicked and hide when clicked again.
     */
    const menu = document.querySelector('.menu-icon-link');
    it('is visible when clicked and is hidden when clicked again', function() {
      menu.click();
        expect(body.classList).not.toContain('menu-hidden');
        // same as: expect(body.classList.contains('menu-hidden')).toBe(false);
      menu.click(); // clicked the 2nd time
        expect(body.classList).toContain('menu-hidden');
        // same as: expect(body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* This test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    beforeEach(function(done) {
      // everything inside here will execute before the 'expect' test below
      loadFeed(0, done);
      // because loadFeed() is asynchronous, 'done' cb let Jasmine knows beforeEach is finished and it can start testing
    });
    const feed = document.querySelector('.feed');
    const entry = feed.getElementsByClassName('entry');
    it('finished loading with at least one entry', function() {
      expect(entry.length).toBeGreaterThan(0);
    });
  });

  /* new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* This test ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    // reference help: https://github.com/bviengineer/frontend-nanodegree-feedreader/blob/master/jasmine/spec/feedreader.js
    const feed = document.querySelector('.feed');
    let firstFeed, secondFeed;

    beforeEach(function(done) {
      loadFeed(0, function(){
        firstFeed = document.querySelector(".entry").innerText;

        loadFeed(1, function(){
          secondFeed = document.querySelector(".entry").innerText;
          done();
        });
      });
    });
    it('has new contents each time new feed is loaded', function() {
      expect(firstFeed !== secondFeed).toBe(true);
    });
  });
}());
