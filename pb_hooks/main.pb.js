routerAdd("GET", "/admin/campaigns/:campaignID/submissions", (c) => {
  let campaignID = c.pathParam("campaignID");

  const campaign = $app.dao().findRecordById("campaign", campaignID);
  const submissionsForCampaign = $app
    .dao()
    .findRecordsByExpr(
      "submissions",
      $dbx.exp("campaign = {:campaignID}", { campaignID: campaignID }),
    );

  $app.dao().expandRecords(submissionsForCampaign, ["submitter"], null);

  // const subs = submissionsForCampaign.map((e) => e.submitter);
  // console.log(subs);
  // console.log(submissionsForCampaign);
  const submitterEmails = submissionsForCampaign
    .map((e) => [
      e.expandedOne("submitter").getString("name"),
      e.expandedOne("submitter").getString("id"),
    ])
    .reduce((acc, [name, id]) => {
      const key = `${name}_${id}`;

      if (acc[key]) {
        acc[key].count += 1;
      } else {
        acc[key] = { name, id, count: 1 };
      }

      return acc;
    }, {});
  return c.json(200, Object.values(submitterEmails));
});
