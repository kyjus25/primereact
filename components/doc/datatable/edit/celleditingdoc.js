import { useEffect, useState } from 'react';
import { ProductService } from '../../../../service/ProductService';
import { Column } from '../../../lib/column/Column';
import { DataTable } from '../../../lib/datatable/DataTable';
import { InputNumber } from '../../../lib/inputnumber/InputNumber';
import { InputText } from '../../../lib/inputtext/InputText';
import { DocSectionCode } from '../../common/docsectioncode';
import { DocSectionText } from '../../common/docsectiontext';

export function CellEditingDoc(props) {
    const [products, setProducts] = useState(null);

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    };

    const code = {
        basic: `
<DataTable value={products} editMode="cell" className="editable-cells-table" responsiveLayout="scroll">
    {columns.map(({ field, header }) => {
        return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
    })}
</DataTable>
        `,
        javascript: `
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProductService } from '../service/ProductService';
import './DataTableDemo.css';

const CellEditingDoc = () => {
    const [products, setProducts] = useState(null);

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    };

    return (
        <div className="card p-fluid datatable-editing-demo">
            <DataTable value={products} editMode="cell" className="editable-cells-table" responsiveLayout="scroll">
                {columns.map(({ field, header }) => {
                    return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
                })}
            </DataTable>
        </div>
    );
}
        `,
        typescript: `
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProductService } from '../service/ProductService';
import './DataTableDemo.css';

const CellEditingDoc = () => {
    const [products, setProducts] = useState(null);

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsMini().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    };

    return (
        <div className="card p-fluid datatable-editing-demo">
            <DataTable value={products} editMode="cell" className="editable-cells-table" responsiveLayout="scroll">
                {columns.map(({ field, header }) => {
                    return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
                })}
            </DataTable>
        </div>
    );
}
        `,
        css: `
/* DataTableDemo.css */

.datatable-editing-demo .editable-cells-table td.p-cell-editing {
    padding-top: 0;
    padding-bottom: 0;
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Validations, dynamic columns and reverting values with the escape key.</p>
            </DocSectionText>
            <div className="card p-fluid">
                <DataTable value={products} editMode="cell" className="editable-cells-table" responsiveLayout="scroll">
                    {columns.map(({ field, header }) => {
                        return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
                    })}
                </DataTable>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}