import { Space, Typography } from 'antd';

interface IRating {
  internalRating: string;
  externalRatings: string;
}

function InternalExternalReview({
  internalRating,
  externalRatings,
}: IRating) {
  return (
    <Space size={60}>
      <Typography.Text>
        <b>Internal Rating: {internalRating}</b>
      </Typography.Text>
      <Typography.Text>
        <b>External Rating: {externalRatings}</b>
      </Typography.Text>
    </Space>
  );
}

export default InternalExternalReview;
