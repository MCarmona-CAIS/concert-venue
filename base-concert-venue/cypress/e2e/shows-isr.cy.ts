it('skips client-side bundle, confirming data from ISR cache', () => {
  //https://glebbahmutov.com/blog/ssr-e2e/
  cy.request('/shows')
    .its('body')
    .then(html => {
      // remove the scripts, so they don't start automatically
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '')
      cy.document().then($el => $el.write(staticHtml));
    });
  cy.findAllByText(/2022 apr 1[456]/i).should('have.length.of', 3);
});