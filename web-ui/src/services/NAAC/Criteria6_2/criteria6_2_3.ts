import request from '@/utils/request';

export async function getAllEgovernance() {
  try {
    const resp = await request({
      method: 'GET',
      url: '/NAAC/criteria6/6.2.3/list',
    });
    return resp?.data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}

export async function getEgovernanceByYear(year) {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.2.3/getArea/${year}`,
    });
    const data = resp?.data;
    return data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}

export async function updateEgovernanceByYear(year, option) {
  try {
    const resp = await request({
      method: 'POST',
      url: `/NAAC/criteria6/6.2.3/edit/${year}`,
      data: option,
    });
    const data = resp?.data;
    return data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}

export async function getAreaGovernanceByYear(year) {
  try {
    const resp = await request({
      method: 'GET',
      url: `/NAAC/criteria6/6.2.3/getArea/${year}`,
    });
    const data = resp?.data;
    return data;
  } catch (err) {
    // Handle Error Here
    console.error(err);
    throw err;
  }
}
