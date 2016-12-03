'use babel';

export default class MoveTabOrSplitView {

    move(orientation, delta) {

        console.log('move', orientation, delta);
        const destroy_empty_panes = atom.config.get('core.destroyEmptyPanes');
        atom.config.set('core.destroyEmptyPanes', true);

        let axis, child, target;
        const source_pane = atom.workspace.getActivePane();
        [axis, child] = this.getAxis(source_pane, orientation);
        if (axis) {
            target_pane = this.getRelativePane(axis, child, delta);
        }
        if ((typeof target_pane !== 'undefined' && target_pane !== null) && source_pane !== target_pane) {
            this.swapEditor(source_pane, target_pane);
        }

        atom.config.set('core.destroyEmptyPanes', destroy_empty_panes);
    }

    swapEditor(source_pane, target_pane) {
        const item = source_pane.getActiveItem();

        source_pane.moveItemToPane(item, target_pane, target_pane.getItems().length);
        target_pane.activateItem(item);
        return target_pane.activate();
    }

    getAxis(pane, orientation) {
        console.log('getAxis', pane, orientation);
        let axis = pane.parent;
        let child = pane;
        while (true) {
            if (axis.constructor.name !== 'PaneAxis') {
                return [null, null];
            }
            if (axis.orientation === orientation) {
                break;
            }
            child = axis;
            axis = axis.parent;
        }
        return [axis, child];
    }

    getRelativePane(axis, source, delta) {
        const position = axis.children.indexOf(source);
        const target = position + delta;
        if (target >= axis.children.length) {
            return;
        }
        return axis.children[target].getPanes()[0];
    }


    // ////======
    // getTargetPane(pane, index) {
    //   let panes = atom.workspace.getPanes();
    //
    //   let current_index = panes.indexOf(pane);
    //
    //   let target_index = current_index + index;
    //   if (target_index < 0) { target_index = 0; }
    //   if (target_index >= panes.length) { target_index = panes.length - 1; }
    //
    //   return panes[target_index];
    // }

}
