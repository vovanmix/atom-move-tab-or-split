'use babel';

export default class MoveTabOrSplitView {

    move(orientation, delta, direction) {
        const destroy_empty_panes = atom.config.get('core.destroyEmptyPanes');
        atom.config.set('core.destroyEmptyPanes', true);

        let axis, child;
        let targetPane = null;
        const sourcePane = atom.workspace.getActivePane();
        [axis, child] = this.getAxis(sourcePane, orientation);
        if (axis) {
            targetPane = this.getRelativePane(axis, child, delta);
        }
        if (targetPane === null) {
            this.splitAndMoveTab(sourcePane, direction);
        } else if ((typeof targetPane === 'object') && sourcePane !== targetPane) {
            this.swapTab(sourcePane, targetPane);
        }

        atom.config.set('core.destroyEmptyPanes', destroy_empty_panes);
    }

    swapTab(sourcePane, targetPane) {
        const item = sourcePane.getActiveItem();

        sourcePane.moveItemToPane(item, targetPane, targetPane.getItems().length);
        targetPane.activateItem(item);
        return targetPane.activate();
    }

    getAxis(pane, orientation) {
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
        let targetPaneIndex = position + delta;
        if (targetPaneIndex < 0 || targetPaneIndex >= axis.children.length) {
            return null;
        }
        return axis.children[targetPaneIndex].getPanes()[0];
    }

    splitAndMoveTab(currentPane, direction) {
        const method = `split${direction}`;
        let newPane = currentPane[method]();
        if (newPane != null) {
            this.swapTab(currentPane, newPane);
        }
    }

}
