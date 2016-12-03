'use babel';

import MoveTabOrSplitView from './move-tab-or-split-view';
import {
    CompositeDisposable
} from 'atom';

export default {

    moveTabOrSplitView: null,
    subscriptions: null,

    activate(state) {
        this.moveTabOrSplitView = new MoveTabOrSplitView(state.moveTabOrSplitViewState);

        atom.commands.add('atom-text-editor', {'move-tab-or-split:down': this.moveDown.bind(this)});
        atom.commands.add('atom-text-editor', {'move-tab-or-split:left': this.moveLeft.bind(this)});
        atom.commands.add('atom-text-editor', {'move-tab-or-split:right': this.moveRight.bind(this)});
        atom.commands.add('atom-text-editor', {'move-tab-or-split:up': this.moveUp.bind(this)});
    },

    serialize() {},

    deactivate() {
        this.subscriptions.dispose();
    },

    moveDown() {
        this.moveTabOrSplitView.move('vertical', 1);
    },

    moveUp() {
        this.moveTabOrSplitView.move('vertical', -1);
    },

    moveRight() {
        this.moveTabOrSplitView.move('horizontal', 1);
    },

    moveLeft() {
        this.moveTabOrSplitView.move('horizontal', -1);
    },

};
