import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { useTranslation } from 'react-i18next'; 

const ArticleInfo = ({ title, author, publisher, source, addedBy}) => {

  const { t } = useTranslation();

  return (
    <div>
      <Row style={{ color: 'grey' }}>
        <Col style={{ textAlign: 'right' }}>
          <p style={{ marginBottom: '0px', marginTop: '20px' }}>
            <span style={{ color: '#4d4d4d' }}>{t('exercise.articleInfo.title')}{':'}</span> {title}
          </p>
          <p>
            <span style={{ color: '#4d4d4d' }}>{t('exercise.articleInfo.author')}{':'}</span> {author}
          </p>
        </Col>
        <Col style={{ textAlign: 'left' }}>
          <p style={{ marginBottom: '0px', marginTop: '20px' }}>
            <span style={{ color: '#4d4d4d' }}>{t('exercise.articleInfo.publisher')}{':'}</span> {publisher}
          </p>
          <p>
            <span style={{ color: '#4d4d4d' }}>{t('exercise.articleInfo.link')}{':'}</span>{' '}
            <a href={source} target="_blank" rel="noopener noreferrer">
              {source}
            </a>
          </p>
        </Col>

      </Row>
      {/* <Row style={{ color: 'grey' }}>
      <Col style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '0px', marginTop: '-15px' }}>
            <span style={{ color: '#4d4d4d' }}>{t('exercise.articleInfo.addedBy')}{':'}</span> {addedBy}
          </p>
        </Col>
      </Row> */}
    </div>
  );
};

export default ArticleInfo;
