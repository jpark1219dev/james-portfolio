import React from 'react';

import HoverMenu from './HoverMenu';
import ControlMenu from './ControlMenu';

import { Editor } from 'slate-react';
import { initialValue } from './initial-value';
import { renderMark, renderNode } from './renderers';
import Html from 'slate-html-serializer';
import { rules } from './rules';
import { Value } from 'slate';

const html = new Html({ rules })

export default class SlateEditor extends React.Component {

	state = {
		value: Value.create(),
		isLoaded: false
	}

	componentDidMount = () => {
		const valueFromProps = this.props.initialValue;
		const value = valueFromProps ? Value.fromJSON(html.deserialize(valueFromProps)) : Value.fromJSON(initialValue);
		this.updateMenu();
		this.setState({isLoaded: true, value});
	}

	componentDidUpdate = () => {
		this.updateMenu();
	}

	onChange = ({ value }) => {
		this.setState({ value })
	}

	onKeyDown = (event, change, next) => {
		const {isLoading} = this.props;

		if(!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			this.save();
			return;
		}
		next();
	}

	updateMenu = () => {
		const menu = this.menu
		if (!menu) return;

		//set width of the hover menu in pixels
		const menuWidth = 350;

		const { value } = this.state;
		const { fragment, selection } = value;

		if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
			menu.removeAttribute('style');
			return;
		}

		const native = window.getSelection();
		const range = native.getRangeAt(0);
		const rect = range.getBoundingClientRect();
		menu.style.opacity = 1;

		/*SET DISTANCE FROM TOP FOR HOVER MENU*/
		menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

		/*SET DISTANCE FROM LEFT FOR HOVER MENU WITHOUT OVERLAPPING WITH LEFT AND RIGHT WINDOW EDGES*/
		const distanceLeft = rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2;
		const distanceRight = rect.left + window.pageXOffset + menu.offsetWidth / 2 + rect.width / 2;

		menu.style.left = distanceLeft > 0 ? `${distanceLeft}px` : 0;
		menu.style.left = distanceRight > window.innerWidth ? `${window.innerWidth - menuWidth}px` : menu.style.left;
		menu.style.left = window.innerWidth < menuWidth ? 0 : menu.style.left;
	}

	getTitle = () => {

		//set getting title here
		// const title = something here

		//set getting subtitle here
		// const subtitle = something here

		return {
			title,
			subtitle
		}
	}

	save = () => {
		const { value } = this.state;
		const { save, isLoading } = this.props;
		const headingValues = this.getTitle();
		const text = html.serialize(value);

		!isLoading && save(text, headingValues);
	}

	render() {
		const { isLoaded } = this.state;

		return (
			<React.Fragment>
				{ isLoaded &&
					<Editor {...this.props} //this picks up the save prop on BlogEditor.js for <SlateEditor/>
						placeholder="Enter some text..."
						value={this.state.value}
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
						renderMark={renderMark}
						renderNode={renderNode}
						renderEditor={this.renderEditor}
					/>
				}
			</React.Fragment>
		)
	}

	renderEditor = (props, editor, next) => {
		const children = next();
		const { isLoading } = props;
		return (
			<React.Fragment>
				<ControlMenu isLoading={isLoading} save={() => this.save()}></ControlMenu>
				{children}
				<HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
				<style jsx>
					{`
						@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
					`}
				</style>
			</React.Fragment>
		)
	}
}