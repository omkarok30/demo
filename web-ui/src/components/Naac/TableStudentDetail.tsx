import TableTooltipIcon from '@/components/Naac/TableTooltipIcon'
import calcPercentage from '@/utils/calculatePercent'
import { ExclamationCircleFilled } from '@ant-design/icons'

const TableStudentDetail = (props) => {
  const { currentData, benefitedTitle, textContent } = props
  return (
    <table style={{ border: '2px solid #f0f0f0' }}>
      <tbody className="ant-table-tbody">
        <tr>
          <td width={300}><b>{`Academic Year`}</b></td>
          <td>{currentData?.year}</td>
        </tr>
        <tr>
          <td width={300}><b>{benefitedTitle}</b></td>
          <td>{currentData?.studentBeneiciaryDetails$count}</td>
        </tr>
        <tr>
          <td width={300}><b>Total number of students	</b></td>
          <td>{currentData?.studentPromotionMap$count}</td>
        </tr>
        <tr>
          <td width={300}><b>Percentage per Year	</b></td>
          <td>
            {
              currentData?.studentBeneiciaryDetails$count && calcPercentage(currentData?.studentBeneiciaryDetails$count, currentData?.studentPromotionMap$count)
            }
            {
              <TableTooltipIcon columnTitle={''} textContent={textContent}><ExclamationCircleFilled /></TableTooltipIcon>
            }
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableStudentDetail