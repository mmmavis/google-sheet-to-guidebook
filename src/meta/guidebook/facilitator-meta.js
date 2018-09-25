class Meta {
  constructor(oldName = ``, newName = ``, convertFunc) {
    this.oldName = oldName;
    this.newName = newName;
    this.newValue = null;
    this.convertFunc = convertFunc;
    this.setNewValue = (oldValue) => {
      this.oldValue = oldValue;
      if (typeof convertFunc === `function`) {
        this.newValue = this.convertFunc(oldValue);
      }
    };
  }
}

let columns = {
  // meta from "accepted proposals spreadsheet" that we wanna keep for Guidebook
  acceptedProposalsSheet: [
    new Meta(`firstname`, `First Name`, (oldValue) => {
      return oldValue.trim();
    }),
    new Meta(`surname`, `Surname`, (oldValue) => {
      return oldValue.trim();
    }),
    new Meta(null, `Name`, () => {
      return ``;
    }),
    new Meta(null, `Sub-Title (i.e. Location, Table/Booth, or Title/Sponsorship Level)`, () => {
      return ``;
    }),
    new Meta(null, `Location/Room`, () => {
      return ``;
    })
  ]
};

export default columns;
