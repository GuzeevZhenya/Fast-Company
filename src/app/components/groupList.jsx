import React from 'react'
import PropTypes from 'prop-types';

export const GroupList = ({items, valueProperty, contentProperty, onItemSelect, selectedItem}) => {
	console.log(items );
	return (
		<ul className="list-group">
			{Object.keys(items).map(item => (
				<li key={items[item][valueProperty]}
					onClick={() => onItemSelect(items[item])}
					role="button"
					className={"list-group-item" + (items[item]=== selectedItem ? " active" : "")}>
						{items[item][contentProperty]}
				</li>
			))}
	</ul> 
	)
}

GroupList.defaultProps = {
	valueProperty: "_id",
	contentProperty: 'name'
}

GroupList.propTypes = {
	items: PropTypes.object.isRequired,
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func,
	selectedItem: PropTypes.object,
}