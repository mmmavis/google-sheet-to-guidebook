import GuidebookSessionMeta from '../../meta/guidebook/session-meta';
import GuidebookFacilitatorMeta from '../../meta/guidebook/facilitator-meta';

export default {
  formatSession: (gsRow) => {
    let session = {};

    // extracting session meta from spreadsheet
    GuidebookSessionMeta.acceptedProposalsSheet.forEach(meta => {
      let metaOldValue = gsRow[meta.oldName];

      meta.setNewValue(metaOldValue);
      session[meta.newName] = meta.newValue;
    });

    session[`Description (Optional)`] += session[`Session Format`];

    return session;
  },
  formatFacilitator: (gsRow) => {
    const UUID = gsRow.uuid;
    const NUM_PER_ROW = 3;
    let facilitators = [];

    for (let index = 0; index <= NUM_PER_ROW; index++) {
      // extracting session meta from spreadsheet
      let facilitator = {};

      GuidebookFacilitatorMeta.acceptedProposalsSheet.forEach(meta => {
        let gsColName = index === 0 ? meta.oldName : `otherfacilitator${index}${meta.oldName}`;
        let metaOldValue = gsRow[gsColName];

        meta.setNewValue(metaOldValue);
        facilitator[meta.newName] = meta.newValue;
      });

      facilitator.Name = `${facilitator[`First Name`]} ${facilitator.Surname}`.trim();

      if (facilitator.Name) {
        facilitator[`Session UUID`] = UUID;
        facilitator[`Session Name`] = gsRow.sessionname.trim();
        facilitator[`Guidebook Session Id`] = gsRow.guidebooksessionid;
        facilitators.push(facilitator);
      }
    }

    return facilitators;
  }
};
