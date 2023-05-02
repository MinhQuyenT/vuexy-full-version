export class FunctionUtility {
    /**
   *Trả ra ngày hiện tại, chỉ lấy năm tháng ngày: yyyy/MM/dd
   */
    getToDay()
    {
        const toDay =
        new Date().getFullYear().toString() +
        "/" +
        (new Date().getMonth() + 1).toString() +
        "/" +
        new Date().getDate().toString();
        return toDay;
    }
    /**
   *Trả ra ngày với tham số truyền vào là ngày muốn format, chỉ lấy năm tháng ngày: yyyy/MM/dd
   */
  getDateFormat(date)
  {
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "/" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
    );
  }

  getUTCDate(d)
  {
    let date = d ? d : new Date();
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    );
  }

  /**
   * Check 1 string có phải empty hoặc null hoặc undefined ko.
   */
  checkEmpty(str)
  {
    return !str || /^\s*$/.test(str);
  }

  /**
   * Append property HttpParams
   * * @param formValue
   */
  ToParams(formValue)
  {
    const params = new URLSearchParams();
    for (const name of Object.keys(formValue))
    {
      const value = formValue[name];
      if (value != null || value != undefined)
        params = params.append(key, value);
    }
    return params;
  }
}