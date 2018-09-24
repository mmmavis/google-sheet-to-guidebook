import escapeHtml from "escape-html";

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

class Timeblock {
  static get ALL_DAY_SAT_AND_SUN() {
    return `All Day Saturday & Sunday`;
  }

  static get DEFAULT_DATE() {
    return ``;
    // return `10/01/2018`;
  }

  static get DEFAULT_START_TIME() {
    return ``;
    // return `01:00`;
  }

  static get DEFAULT_END_TIME() {
    return ``;
    // return `02:00`;
  }

  constructor(timeblockString = ``) {
    /*
      timeblockString value can be any of the following:

      Saturday (10:00 - 11:00)
      Saturday (11:15 - 12:15)
      Saturday (11:15 - 12:45)
      Saturday (13:00 - 13:45)
      Saturday (14:00 - 15:00)
      Saturday (15:15 - 16:15)
      Saturday (16:30 - 17:30)
      Saturday All Day
      Sunday (11:00 - 12:00)
      Sunday (11:00 - 12:30)
      Sunday (12:15 - 13:15)
      Sunday (14:00 - 15:00)
      Sunday (15:15 - 16:15)
      Sunday (16:30 - 17:30)
      Sunday All Day
      All Day Saturday & Sunday
    */

    this.rawValue = timeblockString;
    this.date = this.findDate(timeblockString);
  }

  // get date() {
  //   return this.findDate(this.rawValue);
  // }

  get start() {
    return this.to12HourFormat(this.findStart(this.rawValue));
  }

  get end() {
    return this.to12HourFormat(this.findEnd(this.rawValue));
  }

  to12HourFormat(time = ``) {
    if (!time) return ``;

    time = time.split(`:`);
    let hr = time[0];
    let min = time[1];

    // console.log(typeof time, typeof hr, typeof min);

    // Guidebook time format is "hh:mm AM" (excluding quotation marks)
    return `${hr === `12` ? 12 : hr%12}:${min} ${(hr>=12)? `PM` : `AM`}`;
  }

  findDate(rawValue) {
    let date = Timeblock.DEFAULT_DATE;

    if (!rawValue) return date;

    if (rawValue !== Timeblock.ALL_DAY_SAT_AND_SUN) {
      date = rawValue.split(` `)[0].trim().toLowerCase();
      // console.log(date);
    }

    if (date === `saturday`) {
      date = `10/27/2018`;
    }

    if (date === `sunday`) {
      date = `10/28/2018`;
    }

    return date;
  }

  findStart(rawValue) {
    if (!rawValue) return Timeblock.DEFAULT_END_TIME;

    if (rawValue !== Timeblock.ALL_DAY_SAT_AND_SUN) {
      let matches = rawValue.match(/\d\d:\d\d/g);

      if (!matches) return `all day`;

      return Array.isArray(matches) ? matches[0] : matches;
    }

    return ``;
  }

  findEnd(rawValue) {
    if (!rawValue) return Timeblock.DEFAULT_END_TIME;

    if (rawValue !== Timeblock.ALL_DAY_SAT_AND_SUN) {
      let matches = rawValue.match(/\d\d:\d\d/g);

      if (!matches) return ``;

      return Array.isArray(matches) && matches.length > 1 ? matches[1] : ``;
    }

    return ``;
  }
}

let columns = {
  // meta from "accepted proposals spreadsheet" that we wanna keep for Guidebook
  acceptedProposalsSheet: [
    new Meta(`uuid`, `uuid`, (oldValue) => {
      return `${oldValue}`;
    }),
    new Meta(`sessionname`, `Session Title`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`description`, `Description (Optional)`, (oldValue) => {
      return oldValue.trim()
        // .replace(/\\{2}/g, `"`) // we don't usually have to do this. it's just i messed up
        .replace(/\\"/g, `"`)
        .split(`\n`)
        .filter(paragraph => !!paragraph)
        .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
        .join(``);
    }),
    new Meta(`timeblock`, `Date`, (oldValue) => {
      return new Timeblock(oldValue).date;
    }),
    new Meta(`timeblock`, `Time Start`, (oldValue) => {
      return new Timeblock(oldValue).start;
    }),
    new Meta(`timeblock`, `Time End`, (oldValue) => {
      return new Timeblock(oldValue).end;
    }),
    new Meta(`room`, `Room/Location`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`milestone`, `Schedule Track (Optional)`, (oldValue) => {
      return oldValue;
    })
  ]
};

export default columns;