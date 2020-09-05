interface Dropdown {
  create(levelName: string, subLevel:any[], opened?: boolean): object;
  stringify(levelObj: any): string;
}

export const menu: Dropdown = {

  create: (levelName, subLevel, opened = false) => {
    return {
      levelName: levelName,
      opened: opened,
      arrows: ['⇒', '⇓', '⇨', '⇩'],
      subLevel: subLevel,
    };
  },

  stringify: (levelObj) => {
    let option = '';
    option += levelObj.opened ? levelObj.arrows[1] : levelObj.arrows[0];
    option += ` ${levelObj.levelName} (${levelObj.subLevel.length}) issues`;
    return option;
  }
};
