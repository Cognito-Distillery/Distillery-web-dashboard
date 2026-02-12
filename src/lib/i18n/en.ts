import type { Messages } from './ko';

const en: Messages = {
	// Login
	'login.title': 'Cognito Distillery',
	'login.email': 'Email',
	'login.sendOtp': 'Request Access Code',
	'login.otpSent': 'Enter the access code sent via Slack DM.',
	'login.verify': 'Enter',
	'login.tryOther': 'Try another email',
	'login.otpPlaceholder': '000000',
	'login.errorNetwork': 'Unable to connect to the server.',
	'login.errorInvalidOtp': 'Invalid access code.',
	'login.errorGeneric': 'Something went wrong. Please try again.',

	// TopBar
	'topbar.title': 'Blending Room',
	'topbar.search': 'Search keywords...',
	'topbar.searchServer': 'Search server keywords...',
	'topbar.searchNatural': 'Ask in natural language...',
	'topbar.searchTipLocal': 'Search loaded data by keyword',
	'topbar.searchTipKeyword': 'Search full graph by keyword',
	'topbar.searchTipNatural': 'Search full graph in natural language',

	// SidePanel
	'panel.filters': 'Filters',
	'panel.details': 'Details',
	'panel.editNode': 'Edit Node',
	'panel.editEdge': 'Edit Edge',
	'panel.addEdge': 'Add Edge',
	'panel.back': 'Back',
	'panel.clickToView': 'Click a node or edge to view details.',

	// FilterPanel
	'filter.relationType': 'Relation Type',
	'filter.source': 'Source',
	'filter.all': 'All',
	'filter.relatedTo': 'Related To',
	'filter.supports': 'Supports',
	'filter.conflictsWith': 'Conflicts With',
	'filter.nodes': 'Nodes',
	'filter.edges': 'Edges',

	// NodeDetail
	'node.context': 'Context',
	'node.memo': 'Memo',
	'node.edit': 'Edit',

	// NodeEditor
	'node.summary': 'Summary',
	'node.save': 'Save',
	'node.cancel': 'Cancel',

	// EdgeDetail
	'edge.from': 'From',
	'edge.to': 'To',
	'edge.source': 'Source',
	'edge.confidence': 'Confidence',
	'edge.edit': 'Edit',
	'edge.delete': 'Delete',

	// EdgeEditor
	'edge.relationType': 'Relation Type',
	'edge.selectTarget': 'Click a node on the graph to select target',
	'edge.create': 'Create Edge',
	'edge.update': 'Update Edge',

	// ContextMenu
	'ctx.viewDetail': 'View Details',
	'ctx.editNode': 'Edit Node',
	'ctx.addEdge': 'Add Edge From Here',
	'ctx.expand': 'Expand Subgraph',
	'ctx.editEdge': 'Edit Relation Type',
	'ctx.deleteEdge': 'Delete Edge',
	'ctx.resetView': 'Reset View',

	// ConfirmDialog
	'confirm.title': 'Confirm',
	'confirm.deleteEdge': 'Delete this edge?',
	'confirm.cancel': 'Cancel',
	'confirm.delete': 'Delete',

	// BottomBar
	'bottom.nodes': 'Nodes',
	'bottom.edges': 'Edges',
	'bottom.related': 'Related',
	'bottom.supports': 'Supports',
	'bottom.conflicts': 'Conflicts',

	// Settings
	'settings.title': 'Settings',
	'settings.account': 'Account',
	'settings.language': 'Language',
	'settings.logout': 'Logout',

	// Errors
	'error.loadGraph': 'Failed to load graph data',
	'error.renderGraph': 'Failed to render the graph.',
	'error.expandNode': 'Failed to expand node',
	'error.saveNode': 'Failed to save node',
	'error.saveEdge': 'Failed to save edge',
	'error.searchFailed': 'Search failed.',
	'error.dismiss': 'Dismiss'
};

export default en;
