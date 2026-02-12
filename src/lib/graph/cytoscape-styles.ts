import type { StylesheetStyle } from 'cytoscape';

// Whiskey blending room palette
// Base: pure black canvas
// Nodes: amber/copper tones
// Edges: muted warm tones with spec-defined colors

export const cytoscapeStylesheet: StylesheetStyle[] = [
	{
		selector: 'node',
		style: {
			'background-color': '#b45309',
			label: 'data(label)',
			color: '#a8936a',
			'font-size': '8px',
			'font-weight': 'normal',
			'text-wrap': 'ellipsis',
			'text-max-width': '90px',
			'text-valign': 'bottom',
			'text-margin-y': 5,
			width: 20,
			height: 20,
			'border-width': 1.5,
			'border-color': '#92400e',
			'text-outline-color': '#000000',
			'text-outline-width': 2,
			'overlay-opacity': 0
		}
	},
	{
		selector: 'node:selected',
		style: {
			'border-width': 2.5,
			'border-color': '#f59e0b',
			'background-color': '#d97706',
			width: 24,
			height: 24
		}
	},
	{
		selector: 'node.highlighted',
		style: {
			'background-color': '#d97706',
			'border-width': 1.5,
			'border-color': '#f59e0b'
		}
	},
	{
		selector: 'node.dimmed',
		style: {
			opacity: 0.15
		}
	},
	{
		selector: 'node.search-match',
		style: {
			'border-width': 3,
			'border-color': '#fbbf24',
			'background-color': '#f59e0b',
			width: 26,
			height: 26
		}
	},
	// node:active (grabbed) — brighter feedback
	{
		selector: 'node:grabbed',
		style: {
			'background-color': '#f59e0b',
			'border-color': '#fbbf24',
			'border-width': 2,
			'overlay-opacity': 0
		}
	},
	// RELATED_TO: warm gray
	{
		selector: 'edge[relationType="RELATED_TO"]',
		style: {
			'line-color': '#57534e',
			'target-arrow-color': '#57534e',
			'line-style': 'solid',
			width: 1.2,
			'target-arrow-shape': 'triangle',
			'arrow-scale': 0.8,
			'curve-style': 'bezier',
			opacity: 0.6
		}
	},
	// SUPPORTS: muted green
	{
		selector: 'edge[relationType="SUPPORTS"]',
		style: {
			'line-color': '#4d7c0f',
			'target-arrow-color': '#4d7c0f',
			'line-style': 'solid',
			width: 1.2,
			'target-arrow-shape': 'triangle',
			'arrow-scale': 0.8,
			'curve-style': 'bezier',
			opacity: 0.7
		}
	},
	// CONFLICTS_WITH: deep red dashed
	{
		selector: 'edge[relationType="CONFLICTS_WITH"]',
		style: {
			'line-color': '#b91c1c',
			'target-arrow-color': '#b91c1c',
			'line-style': 'dashed',
			width: 1.2,
			'target-arrow-shape': 'triangle',
			'arrow-scale': 0.8,
			'curve-style': 'bezier',
			opacity: 0.7
		}
	},
	// Human source: thicker
	{
		selector: 'edge[edgeSource="human"]',
		style: {
			width: 2.5,
			opacity: 0.85
		}
	},
	{
		selector: 'edge:selected',
		style: {
			width: 3,
			'line-color': '#f59e0b',
			'target-arrow-color': '#f59e0b',
			opacity: 1
		}
	},
	{
		selector: 'edge.dimmed',
		style: {
			opacity: 0.05
		}
	},
	{
		selector: 'edge.highlighted',
		style: {
			opacity: 0.9
		}
	}
];
