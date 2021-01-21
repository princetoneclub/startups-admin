import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Database.css'

const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
    {
        class: "details-control",
        orderable: false,
        data: '',
        defaultContent:""
    },
    {
        title: 'Name',
        data: 'name',
    },
    {
        title: 'Industry',
        data: 'industry'
    },
    {
        title: 'Technology',
        data: 'technology'
    },
    {
        title: 'Region',
        data: 'region'
    },
    {
        title: 'Employee Count',
        data: 'employeeCount',
        visible: false
    },
    {
        title: 'Total Funding',
        data: 'totalFunding',
        visible: false
    },
    {
        title: 'Website Link',
        data: 'websiteLink',
        visible: false
    },
];

function reloadTableData(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}

function updateTable(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = names.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
       return true;
    });

    if (dataChanged) {
        table.draw();
    }
}

function format ( d ) {
    return '<b>Employee Count:</b> '+d.employeeCount+'<br>'+
        '<b>Total Funding:</b> '+d.totalFunding+'<br>'+
        '<b>Website:</b> '+'<a class="website-link" href="'+d.websiteLink+'" target="_blank">'+d.websiteLink+'</a>';
}

class Table extends Component {
    componentDidMount() {
        var detailRows=[]
        var dt = $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"lfrtip>',
            data: this.props.names,
            columns,
            ordering: true,
            searching: true,
            processing: true,
            paging: true,
            deferRender: true,
            // scrollX: true,
            // scrollY: true,
            // scrollCollapse:true,
            autoWidth: false,
            lengthChange: true,
            order: [[1,'asc']],
            // serverSide: true,
            // stripeClasses:[]
        });
        $(this.refs.main).on( 'click', 'tr td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = dt.row( tr );
            var idx = $.inArray( tr.attr('id'), detailRows );
     
            if ( row.child.isShown() ) {
                tr.removeClass( 'details' );
                row.child.hide();
     
                // Remove from the 'open' array
                detailRows.splice( idx, 1 );
            }
            else {
                tr.addClass( 'details' );
                row.child( format( row.data() ) ).show();
     
                // Add to the 'open' array
                if ( idx === -1 ) {
                    detailRows.push( tr.attr('id') );
                }
            }
        } );
     
        // On each draw, loop over the `detailRows` array and show any child rows
        dt.on( 'draw', function () {
            $.each( detailRows, function ( i, id ) {
                $('#'+id+' td.details-control').trigger( 'click' );
            } );
        } );
    }

    componentWillUnmount(){
       $('.data-table-wrapper').find('table').DataTable().destroy(true);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.names.length !== this.props.names.length) {
            reloadTableData(nextProps.names);
        } else {
            updateTable(nextProps.names);
        }
        return false;
    }



    render() {
        return (
            <div>
                <table ref="main" class="display"/>
            </div>);
    }
}

Table.propTypes = {
    names: PropTypes.array
};

export default Table;