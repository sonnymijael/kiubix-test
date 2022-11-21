import { LineChart, PieChart, AreaChart, Area, BarChart, Bar, Legend, YAxis, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, Pie } from 'recharts'

export default function Charts({ data, option = 'Line', color = '#7ed3fc' }){
  console.log(option)

  if(option === 'Bar'){
    return (
      <div>
        <BarChart width={500} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Branch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill={color} />
        </BarChart>
      </div>
    )
  }

  if (option === 'Pie') {
    return (
      <div>
        <PieChart width={500} height={500}>
          <Tooltip />
          <Legend />
          <Pie data={data} dataKey="valor" cx="50%" cy="50%" outerRadius={140} fill={color} />
        </PieChart>
      </div>
    )
  }

  if (option === 'Area'){
    return (
      <div>
        <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Branch" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="valor" stroke="#8884d8" fill={color} />
      </AreaChart>
      </div>
    )
  }

  if(option === 'Line'){
    return (
      <div className='p-5'>
        <LineChart
          width={500}
          height={500}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          data={data}
        >
          <XAxis dataKey="Branch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="valor" stroke={color} yAxisId={0} />
        </LineChart>
      </div>
    )
  }
}