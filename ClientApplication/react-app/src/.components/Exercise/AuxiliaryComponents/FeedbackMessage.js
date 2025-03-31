import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { GrFormNextLink } from 'react-icons/gr';
import { GiFinishLine } from 'react-icons/gi';

import { useTranslation } from 'react-i18next'; 

const FeedbackMessage = ({ feedbackMessage, currentParagraphIndex, paragraphs, handleNextParagraphOrQuestion }) => {
 
  const { t } = useTranslation();

  return (
    <div
      className="mainContainer"
      style={{ color: feedbackMessage.includes('Correct') ? 'var(--color-lime)' : 'var(--color-pink)' }}
    >
      <Row style={{ alignItems: 'center', height: '100%' }}>
        <Col>
          <h4 style={{ display: 'flex', alignItems: 'center', height: '100%', fontSize: '30px' }}>
            {feedbackMessage}
          </h4>
        </Col>
        <Button
          className="buttons lightBlue"
          size="lg"
          style={{
            marginRight: '12px',
            width: '200px',
          }}
          onClick={handleNextParagraphOrQuestion}
        >
          {currentParagraphIndex < paragraphs.length - 1 ? (
            <>
              {t('exercise.message.nextParagraph')} <GrFormNextLink className="icons"/>
            </>
          ) : (
            <>
              {t('exercise.message.finish')} <GiFinishLine className="icons"/>
            </>
          )}
        </Button>
      </Row>
    </div>
  );
};

export default FeedbackMessage;
