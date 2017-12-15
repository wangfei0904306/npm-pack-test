/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/util/city.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday December 8th 2017 8:23:58 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday December 8th 2017 8:23:58 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
export default function cityOptions(data) {
  const provinces = data.provinces;
  const cities = data.cities;
  const areas = data.areas;

  areas.forEach((area) => {
    const matchCity = cities.filter(city => city.code === area.parent_code)[0];
    if (matchCity) {
      matchCity.children = matchCity.children || [];
      matchCity
        .children
        .push({ label: area.name, value: area.code });
    }
  });

  cities.forEach((city) => {
    const matchProvince = provinces.filter(province => province.code === city.parent_code)[0];
    if (matchProvince) {
      matchProvince.children = matchProvince.children || [];
      matchProvince
        .children
        .push({ label: city.name, value: city.code, children: city.children });
    }
  });
  const options = provinces.map(province => ({
    label: province.name,
    value: province.code,
    children: province.children,
  }));
  return options;
}
