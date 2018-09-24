import GuidebookSessionMeta from '../../meta/guidebook/session-meta';

export default {
  formatSheetRow: (gsRow) => {
    let formatted = {};

    // extracting meta from all proposals spreadsheet
    GuidebookSessionMeta.acceptedProposalsSheet.forEach(meta => {
      let metaOldValue = gsRow[meta.oldName];

      meta.setNewValue(metaOldValue);
      formatted[meta.newName] = meta.newValue;
    });

    return formatted;
  }
};
