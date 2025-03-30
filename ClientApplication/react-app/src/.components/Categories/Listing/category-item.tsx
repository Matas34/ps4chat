import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "../../../styles/Categories/categories.css"; // stylesheet
import { MdModeEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';

interface CategoryItemProps {
    data: {
        id: number; // Ensure each category has a unique id
        title: string;
        text: string;
    };
    settings?: {
        showSelectButton?: boolean;
        showDeleteButton?: boolean;
        showEditButton?: boolean;
    };
    selectThis?: (id?: number) => void;
    deleteThis?: (id?: number) => void;
    editThis?: (id?: number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
    const { t } = useTranslation();
    const { settings, selectThis, deleteThis, editThis } = props;
    const [categoryColor, setCategoryColor] = useState<string>('red');

    // Available color categories
    const colorCategories = [
        'red',
        'pink',
        'purple',
        'deepPurple',
        'indigo',
        'blue',
        'lightBlue',
        'cyan',
        'teal',
        'green',
        'lightGreen',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deepOrange',
    ];

    useEffect(() => {
        setCategoryColor(generateCategoryFromId(props.data.title));
    }, [props.data.title]);

    const generateCategoryFromId = (id: string): string => {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colorCategories.length; // Ensure index is within bounds
        return colorCategories[index];
    };

    const handleContainerClick = () => {
        if (selectThis) selectThis(props.data.id);
    };

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (deleteThis) deleteThis(props.data.id);
    };

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (editThis) editThis(props.data.id);
    };

    return (
        <div
            className={`category-item ${categoryColor}`} // Use category-item class
            onClick={handleContainerClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleContainerClick();
                }
            }}
        >
            <Row className="rowCategories">
                <Col className="col">
                    <h2 className="wrap-title" style={{fontSize:"27px"}}>{props.data.title}</h2>
                    <p className="wrap-category">{props.data.text}</p>
                </Col>
            </Row>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {settings?.showDeleteButton && (
                    <Button
                        onClick={handleDeleteClick}
                        className='buttons red'
                        aria-label={t('commonUIelements.delete')}
                    >
                        {t('commonUIelements.delete')}
                    </Button>
                )}
                {settings?.showEditButton && (
                    <Button
                        onClick={handleEditClick}
                        className='buttons lightBlue'
                        aria-label={t('commonUIelements.edit')}
                    >
                        <MdModeEdit className="icons" /> {t('commonUIelements.edit')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CategoryItem;

