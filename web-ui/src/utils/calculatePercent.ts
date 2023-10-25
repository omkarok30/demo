export default function calcPercentage(count: any, totalStudents: any) {
  const percentage = (count && totalStudents) ? ((Number(count) / Number(totalStudents)) * 100).toFixed(2) : 0;
  return +percentage as number;
}

export function calcAveragePercentage(data: any[]) {
  const averagePercentage = data.reduce((acc: number, curr: { studentBeneiciaryDetails$count: any; studentPromotionMap$count: any }) => {
    const { studentBeneiciaryDetails$count, studentPromotionMap$count } = curr;
    const getPercentage = calcPercentage(studentBeneiciaryDetails$count, studentPromotionMap$count);
    return acc += getPercentage;
  }, 0);

  return averagePercentage / 5;
}
