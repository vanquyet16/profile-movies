import React from "react";
import { Sheet, Button, Page, Text, useNavigate } from "zmp-ui";
import { chooseImage } from "zmp-sdk/apis";

const AboutPage: React.FunctionComponent = (props) => {
  const [actionSheetOpened, setActionSheetOpened] = React.useState(false);
  const navigate = useNavigate();

const handleChooseImage = async () => {
  try {
    const { filePaths, tempFiles } = await chooseImage({
      sourceType: ["camera"],
      cameraType: "front",
      count: 1
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
  return (
    <Page className="page">
      <div className="section-container">
        <Text>Đù má sài gòn adasdasdsaádasdas </Text>
      </div>
      <div>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => handleChooseImage()}
        >
          Back
        </Button>
      </div>
      <Sheet.Actions
        visible={actionSheetOpened}
        onClose={() => setActionSheetOpened(false)}
        actions={[
          [
            {
              text: "Go back",
              onClick: () => {
                navigate(-1);
              },
            },
            {
              text: "Action 1",
              close: true,
            },
            {
              text: "Action 2",
              close: true,
            },
          ],
          [
            {
              text: "Close",
              close: true,
              danger: true,
            },
          ],
        ]}
      ></Sheet.Actions>
    </Page>
  );
};

export default AboutPage;
